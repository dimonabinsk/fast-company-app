import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import SpinnerLoading from "../components/common/spinnerLoading";

export const instanceHTTPAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    // const key = process.env.REACT_APP_FIREBASE_KEY;
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (e) {
            errorCather(e);
        } finally {
            setLoading(false);
        }
    }

    async function updateUserData(id) {
        try {
            const { content } = await userService.updateUser(id);
            setUser(content);
        } catch (e) {
            errorCather(e);
        }
    }

    async function signUp({ email, password, ...rest }) {
        const url = "accounts:signUp?";

        try {
            const { data } = await instanceHTTPAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
            // console.log(data);
        } catch (e) {
            errorCather(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            // console.log(content);
            setUser(content);
        } catch (e) {
            errorCather(e);
        }
    }

    async function logIn({ email, password }) {
        const url = "accounts:signInWithPassword";

        try {
            const { data } = await instanceHTTPAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (e) {
            errorCather(e);
            // console.log(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                const errorObject = {
                    email: {
                        email: "Пользователя с таким email не существует"
                    },
                    password: {
                        password: "Проверьте правильность введённого пароля"
                    }
                };
                if (message === "EMAIL_NOT_FOUND") {
                    throw errorObject.email;
                }
                if (message === "INVALID_PASSWORD") {
                    throw errorObject.password;
                }
            }
        }
    }

    const logOut = () => {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    };
    return (
        <AuthContext.Provider
            value={{ signUp, currentUser, logIn, logOut, updateUserData }}
        >
            {!isLoading ? children : <SpinnerLoading />}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;

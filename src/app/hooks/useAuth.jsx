import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";

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

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
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
            console.log(content);
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
            getUserData();
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
    return (
        <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
            {children}
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

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const instanceHTTPAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/"
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const key = process.env.REACT_APP_FIREBASE_KEY;
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp?key=${key}`;

        try {
            const { data } = await instanceHTTPAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
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
            const { content } = userService.create(data);
            setUser(content);
        } catch (e) {
            errorCather(e);
        }
    }

    async function logIn({ email, password }) {
        const url = `accounts:signInWithPassword?key=${key}`;

        try {
            const { data } = await instanceHTTPAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
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

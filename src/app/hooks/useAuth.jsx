import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// const TOKEN_KEY = "jwt-token";
// const REFRESH_KEY = "jwt-refresh-token";
// const EXPIRES_KEY = "jwt-expires";

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    // function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    //     const expiresData = new Date().getTime() + expiresIn * 1000;
    //     localStorage.setItem(TOKEN_KEY, idToken);
    //     localStorage.setItem(REFRESH_KEY, refreshToken);
    //     localStorage.setItem(EXPIRES_KEY, expiresData);
    // }

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
        const key = process.env.REACT_APP_FIREBASE_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
            console.log(data);
            console.log(currentUser);
        } catch (e) {
            errorCather(e);
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (e) {
            errorCather(e);
        }
    } return (
        <AuthContext.Provider value={{ signUp }}>
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

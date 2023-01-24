import axios from "axios";
import localStorageService from "./localStorage.service";

const instanceHTTPAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await instanceHTTPAuth.post("accounts:signUp?", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    logIn: async ({ email, password }) => {
        const { data } = await instanceHTTPAuth.post(
            "accounts:signInWithPassword",
            {
                email,
                password,
                returnSecureToken: true
            }
        );
        return data;
    },
    refresh: async () => {
        const { data } = await instanceHTTPAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;

import axios from "axios";
import localStorageService from "./localStorage.service";

const HTTPAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await HTTPAuth.post("accounts:signUp?", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    logIn: async ({ email, password }) => {
        const { data } = await HTTPAuth.post(
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
        const { data } = await HTTPAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
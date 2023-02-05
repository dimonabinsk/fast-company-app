import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const HTTPAuth = axios.create({
    baseURL: config.API_BASE_URL + "/auth/"
});

const authService = {
    register: async (payload) => {
        const { data } = await HTTPAuth.post("signUp", payload);
        return data;
    },
    logIn: async ({ email, password }) => {
        const { data } = await HTTPAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        });
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

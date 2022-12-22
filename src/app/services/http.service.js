import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { instanceHTTPAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.API_BASE_URL
});
// axios.defaults.baseURL = configFile.API_BASE_URL;

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = `${
                containSlash ? config.url.slice(0, -1) : config.url
            }.json`;
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await instanceHTTPAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                // console.log(data);
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.params = {
                ...config.params,
                auth: accessToken
            };
        }

        // console.log(config.url);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.values(data).map((value) => ({
              ...value
          }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
            // console.log(res.data);
        }

        return res;
    },
    function (e) {
        const isExpectedError =
            e.response && e.response.status >= 400 && e.response.status < 500;
        if (!isExpectedError) {
            // console.log(e);
            toast.error(
                "Произошла непредвиденная ошибка, пожалуйста, попробуйте изменить ее позже"
            );
            // Например вывести ошибку пользователю
            // alert(e);
        }
        return Promise.reject(e);
    }
);

const httpServices = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpServices;

import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.API_BASE_URL
});
// axios.defaults.baseURL = configFile.API_BASE_URL;

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = `${
                containSlash ? config.url.slice(0, -1) : config.url
            }.json`;
        }

        // console.log(config.url);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.values(data).map((value) => ({
              ...value
          }))
        : [];
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        // console.log(res.data);
        return res;
    },
    function (e) {
        const isExpectedError =
            e.response && e.response.status >= 400 && e.response.status < 500;
        if (!isExpectedError) {
            console.log(e);
            toast.error(
                "An unexpected error has occurred, please try to change it later"
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

import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.API_BASE_URL;

axios.interceptors.response.use(
    (res) => res,
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
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServices;

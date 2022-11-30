import httpServices from "./http.service";

const userEndPoint = "user/";
const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    }
};

export default userService;

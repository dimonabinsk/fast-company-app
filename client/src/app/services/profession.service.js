import httpServices from "./http.service";

const userEndPoint = "profession/";
const professionService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    }
};

export default professionService;

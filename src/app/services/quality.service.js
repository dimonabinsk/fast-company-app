import httpServices from "./http.service";

const qualityEndPoint = "quality/";

const qualityService = {
    get: async (id) => {
        const { data } = await httpServices.get(qualityEndPoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpServices.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;

import httpServices from "./http.service";

const qualityEndPoint = "quality/";

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpServices.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;

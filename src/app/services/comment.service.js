import httpServices from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (dataComment) => {
        const { data } = await httpServices.put(commentEndPoint + dataComment._id, dataComment);
        return data;
    }
};

export default commentService;

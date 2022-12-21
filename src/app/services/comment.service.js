import httpServices from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (dataComment) => {
        const { data } = await httpServices.put(commentEndPoint + dataComment._id, dataComment);
        return data;
    },
    getComment: async (pageId) => {
        const { data } = await httpServices.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    }
};

export default commentService;

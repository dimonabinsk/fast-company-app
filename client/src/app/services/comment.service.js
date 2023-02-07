import httpServices from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpServices.post(commentEndPoint, payload);
        return data;
    },
    getComment: async (pageId) => {
        const { data } = await httpServices.get(commentEndPoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        });
        return data;
    },
    deleteComment: async (commentId) => {
        const { data } = await httpServices.delete(commentEndPoint + commentId);
        return data;
    }
};

export default commentService;

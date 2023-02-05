import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addComment: (state, action) => {
            state.entities.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
    commentsRequested,
    commentsReceived,
    commentsRequestedFiled,
    addComment,
    deleteComment
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComment(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestedFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(addCommentRequested());

    try {
        const { content } = await commentService.createComment(payload);
        dispatch(addComment(content));
    } catch (error) {
        dispatch(commentsRequestedFiled(error.message));
    }
};

export const delComment = (commentId) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.deleteComment(commentId);
        if (!content) {
            dispatch(deleteComment(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestedFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const getCommentsByIds = (commentsIds) => (state) => {
    if (state.comments.entities) {
        return state.comments.entities.find(
            (comment) => comment._id === commentsIds
        );
    }
};

export default commentsReducer;

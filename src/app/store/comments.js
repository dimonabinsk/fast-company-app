import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

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
            state.entities = action.payload;
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

export const createComment =
    (commentData, userId, currentUserId) => async (dispatch) => {
        dispatch(addCommentRequested(commentData));
        const comment = {
            ...commentData,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(addComment(content));
        } catch (error) {
            dispatch(commentsRequestedFiled(error.message));
        }
    };

export const delComment = (id, comments) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.deleteComment(id);
        if (content === null) {
            dispatch(
                deleteComment(comments.filter((comment) => comment._id !== id))
            );
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

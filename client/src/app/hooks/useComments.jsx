import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComment();
    }, [userId]);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };

        try {
            const { content } = await commentService.createComment(comment);
            setComments((prev) => [...prev, content]);
        } catch (e) {
            errorCather(e);
        }
    }

    async function getComment() {
        try {
            const { content } = await commentService.getComment(userId);
            setComments(content);
        } catch (e) {
            errorCather(e);
        } finally {
            setLoading(false);
        }
    }

    async function deleteComment(id) {
        try {
            const { content } = await commentService.deleteComment(id);
            if (content === null) {
                setComments((prev) =>
                    prev.filter((comment) => comment._id !== id)
                );
            }
        } catch (e) {
            errorCather(e);
        }
    }
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, deleteComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

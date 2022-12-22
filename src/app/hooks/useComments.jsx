import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComment();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };

        try {
            const { content } = await commentService.createComment(comment);
            // console.log(content);
            setComments((prev) => [...prev, content]);
        } catch (e) {
            errorCather(e);
        }
    }

    async function getComment() {
        try {
            const { content } = await commentService.getComment(userId);
            // console.log(content);
            setComments(content);
        } catch (e) {
            errorCather(e);
            // console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCather(error) {
        const { message } = error.response.data;
        console.log(error);
        setError(message);
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading }}
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

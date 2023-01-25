import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

import AddCommentForm from "../../page/userPage/addCommentForm";
import CommentsList from "../../page/userPage/commentsList";
// import { useComments } from "../../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    delComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../../store/comments";
import SpinnerLoading from "../../common/spinnerLoading";
import { getCurrentUserId } from "../../../store/users";

const Comments = ({ userId }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    // const { deleteComment } = useComments();

    const handleAddComment = (commentData) => {
        if (currentUserId) {
            dispatch(createComment(commentData, userId, currentUserId));
        }
    };

    const handleDeleteComment = (commentId) => {
     dispatch(delComment(commentId, comments));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAddComment={handleAddComment} />
                </div>
                {sortedComments.length > 0 && (
                    <div className="card-footer">
                        <div className="card">
                            <h2 className="text-center lh-lg">Комментарии</h2>
                            {/* <hr /> */}
                            {!isLoading ? (
                                <CommentsList
                                    onDeleteComment={handleDeleteComment}
                                    isComments={sortedComments}
                                />
                            ) : (
                                <SpinnerLoading />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import { useParams } from "react-router-dom";
import AddCommentForm from "./addCommentForm";
import CommentsList from "./commentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    delComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../../store/comments";
import SpinnerLoading from "../spinnerLoading";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleAddComment = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };

    const handleDeleteComment = (commentId) => {
        dispatch(delComment(commentId));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmitComment={handleAddComment} />
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

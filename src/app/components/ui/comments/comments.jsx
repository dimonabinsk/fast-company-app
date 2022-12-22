import React from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

import AddCommentForm from "../../page/userPage/addCommentForm";
import CommentsList from "../../page/userPage/commentsList";
import { useComments } from "../../../hooks/useComments";

const Comments = ({ userId }) => {
    const { createComment, comments, deleteComment } = useComments();

    const handleAddComment = (data) => {
        createComment(data);
    };

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId);
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
                            <CommentsList
                                onDeleteComment={handleDeleteComment}
                                isComments={sortedComments}
                            />
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

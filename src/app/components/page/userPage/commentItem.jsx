import React from "react";
import PropTypes from "prop-types";

import { displayDate } from "../../../utility/displayDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const CommentItem = ({
    _id: idComment,
    content: commentContent,
    created_at: commentTime,
    userId,
    onDeleteComment
}) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const { currentUser } = useAuth();

    return (
        <div className="d-flex flex-start mt-2">
            <img
                src={user.image}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {user.name}
                            <span className="small fst-italic fw-light ms-2">
                                {" "}
                                {displayDate(commentTime)}{" "}
                            </span>
                        </p>
                        {currentUser._id === userId && (
                            <button
                                onClick={() => onDeleteComment(idComment)}
                                className="btn btn-sm text-primary d-flex align-items-center"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                    <p className="small mb-0">{commentContent}</p>
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    _id: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onDeleteComment: PropTypes.func
};

export default CommentItem;

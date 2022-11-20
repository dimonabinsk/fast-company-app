import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import API from "../../../../api";
import SpinnerLoading from "../../common/spinnerLoading";
import { displayDate } from "../../../utility/displayDate";

const CommentItem = ({
    _id: idComment,
    content: commentContent,
    created_at: commentTime,
    userId,
    onDeleteComment
}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then((data) => {
            setUser(data);
            setIsLoading(false);
        });
    }, []);

    return isLoading ? (
        <SpinnerLoading />
    ) : (
        <div className="d-flex flex-start mt-2">
            <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {user && user.name}
                            <span className="small">
                                {" "}
                                {displayDate(commentTime)}{" "}
                            </span>
                        </p>
                        <button
                            onClick={() => onDeleteComment(idComment)}
                            className="btn btn-sm text-primary d-flex align-items-center"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
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

import React from "react";
import PropTypes from "prop-types";

import CommentItem from "./commentItem";

const CommentsList = ({ onDeleteComment, isComments }) => {
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    {isComments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            {...comment}
                            onDeleteComment={onDeleteComment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    users: PropTypes.array,
    isComments: PropTypes.array,
    onDeleteComment: PropTypes.func
};

export default CommentsList;

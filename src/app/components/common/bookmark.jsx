import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    return (
        <>
            <button className="btn btn-sm" {...rest}>
                <i
                    className={`bi bi-emoji-heart-eyes${
                        status ? "-fill text-primary" : ""
                    } fs-2 `}
                ></i>
            </button>
        </>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;

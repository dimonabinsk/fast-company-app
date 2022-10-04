import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, onHandler, mark }) => {
    return (
        <>
            <button className="btn btn-sm" onClick={() => onHandler(id)}>
                {mark
                    ? (
                        <i className="bi bi-emoji-heart-eyes-fill fs-2 text-primary"></i>
                    )
                    : (
                        <i className="bi bi-emoji-heart-eyes fs-2"></i>
                    )}
            </button>
        </>
    );
};

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    onHandler: PropTypes.func.isRequired,
    mark: PropTypes.bool.isRequired
};

export default Bookmark;

import React from "react";
import PropTypes from "prop-types";

const ArrowBtn = ({ selectedObj, path }) => {
    return selectedObj.path === path ? (
        selectedObj.order === "asc" ? (
            <i className="bi bi-caret-up-fill ms-1"></i>
        ) : (
            <i className="bi bi-caret-down-fill ms-1"></i>
        )
    ) : null;
};

ArrowBtn.propTypes = {
    selectedObj: PropTypes.object,
    path: PropTypes.string
};

export default ArrowBtn;

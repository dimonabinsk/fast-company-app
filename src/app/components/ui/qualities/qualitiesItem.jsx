import React from "react";
import PropTypes from "prop-types";

const QualitiesItem = ({ color, name }) => {
    return (
        <>
            <span className={`badge  bg-${color} me-1`}>{name}</span>
        </>
    );
};

QualitiesItem.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default QualitiesItem;

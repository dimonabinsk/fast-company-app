import React from "react";
import PropTypes from "prop-types";

const QualitiesItem = ({ _id, color, name }) => {
    return (
        <span className={`badge  bg-${color} me-1`} key={_id}>
            {name}
        </span>
    );
};

QualitiesItem.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default QualitiesItem;

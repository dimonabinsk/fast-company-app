import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ color, name }) => {
    return (
        <div className="px-4">
            <span className={`badge  bg-${color} me-1`}>{name}</span>
        </div>
    );
};

Qualities.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualities;

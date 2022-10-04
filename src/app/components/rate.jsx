import React from "react";
import PropTypes from "prop-types";

const Rate = ({ rate }) => {
    return <span>{`5/${rate}`}</span>;
};

Rate.propTypes = {
    rate: PropTypes.number.isRequired
};

export default Rate;

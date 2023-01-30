import React from "react";
import PropTypes from "prop-types";

const Rate = ({ rate }) => {
    return <span>{`${rate}/5`}</span>;
};

Rate.propTypes = {
    rate: PropTypes.number.isRequired
};

export default Rate;

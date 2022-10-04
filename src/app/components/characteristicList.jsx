import React from "react";
import PropTypes from "prop-types";
import Characteristic from "./characteristic";

const CharacteristicList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Characteristic key={quality._id} {...quality} />
            ))}
        </>
    );
};

CharacteristicList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default CharacteristicList;

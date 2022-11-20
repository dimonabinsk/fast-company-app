import React from "react";
import PropTypes from "prop-types";
import QualitiesItem from "./qualitiesItem";

const QualitiesCard = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <QualitiesItem key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;

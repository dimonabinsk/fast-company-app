import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesItem = ({ id }) => {
    const { getQuality } = useQualities();
    const quality = getQuality(id);

    return (
        <span className={`badge  bg-${quality.color} me-1`}>
            {quality.name}
        </span>
    );
};

QualitiesItem.propTypes = {
    id: PropTypes.string.isRequired
};

export default QualitiesItem;

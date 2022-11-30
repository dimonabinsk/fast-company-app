import React from "react";
import PropTypes from "prop-types";
import QualitiesItem from "./qualitiesItem";
import SpinnerLoading from "../../common/spinnerLoading";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesCard = ({ qualities: id }) => {
    const { isLoading } = useQualities();

    return (
        <>
            {!isLoading ? (
                id.map((qId) => (
                    <QualitiesItem key={qId} id={qId} />
                ))
            ) : (
                <SpinnerLoading />
            )}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;

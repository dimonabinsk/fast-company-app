import React from "react";
import PropTypes from "prop-types";
import QualitiesItem from "./qualitiesItem";
import SpinnerLoading from "../../common/spinnerLoading";
// import { useQualities } from "../../../hooks/useQualities";
import { useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const QualitiesCard = ({ qualities: id }) => {
    // const { isLoading } = useQualities();

    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) {
        return (
            <>
                <SpinnerLoading />
            </>
        );
    }

    const qualitiesList = useSelector(getQualitiesByIds(id));
    return (
        <>
            {qualitiesList.map((qual) => (
                <QualitiesItem key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import QualitiesItem from "./qualitiesItem";
import SpinnerLoading from "../../common/spinnerLoading";
// import { useQualities } from "../../../hooks/useQualities";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesCard = ({ qualities: id }) => {
    // const { isLoading } = useQualities();

    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(id));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) {
        return (
            <>
                <SpinnerLoading />
            </>
        );
    }

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

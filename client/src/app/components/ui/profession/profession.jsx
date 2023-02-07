import React from "react";
import PropTypes from "prop-types";
import SpinnerLoading from "../../common/spinnerLoading";
import { useSelector } from "react-redux";
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionsByIds(id));

    if (isLoading) {
        return <SpinnerLoading />;
    }
    return <p>{prof.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

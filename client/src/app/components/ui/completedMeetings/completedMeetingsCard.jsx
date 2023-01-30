import React from "react";
import PropTypes from "prop-types";

const CompletedMeetingsCard = ({ meetings }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Количество встреч</span>
                </h5>

                <span className="display-1">{meetings}</span>
            </div>
        </div>
    );
};

CompletedMeetingsCard.propTypes = {
    meetings: PropTypes.number
};

export default CompletedMeetingsCard;

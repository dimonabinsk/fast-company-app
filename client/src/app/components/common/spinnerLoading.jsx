import React from "react";

const SpinnerLoading = () => {
    return (
        <i className="d-flex justify-content-center">
            <i
                className="spinner-border spinner-border-sm text-primary m-2"
                role="status"
            ></i>
            <span className="text-primary mt-1">Загрузка...</span>
        </i>
    );
};

export default SpinnerLoading;

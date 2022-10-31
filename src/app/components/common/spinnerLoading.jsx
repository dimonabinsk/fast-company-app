import React from "react";

const SpinnerLoading = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-border spinner-border-sm text-primary m-2"
                role="status"
            ></div>
            <span className="text-primary mt-1">Загрузка...</span>
        </div>
    );
};

export default SpinnerLoading;

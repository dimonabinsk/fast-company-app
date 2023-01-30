import React from "react";
import useMockData from "../utility/mockData";
// import PropTypes from "prop-types";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1 className="text-center">Главная страница</h1>
            <h3>Инициализация данных FireBase</h3>
            <ul className="list-unstyled">
                <li>
                    <div className="progress">
                        <div
                            style={{ width: `${progress}%` }}
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            aria-label="Базовый пример"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {progress}%
                        </div>
                    </div>
                </li>
                <li>Статус: {status}</li>
                {error && <li>Ошибка: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

// Main.propTypes = {};

export default Main;

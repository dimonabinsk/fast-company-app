import React from "react";
import { Link, useLocation } from "react-router-dom";

// import PropTypes from "prop-types";

const NavBar = () => {
    const { pathname } = useLocation();

    const pathLink = [
        {
            id: 1,
            path: "/",
            name: "Главная"
        },
        {
            id: 2,
            path: "/login",
            name: "Авторизация"
        },
        {
            id: 3,
            path: "/users",
            name: "Быстрые встречи"
        }
    ];
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {pathLink.map(({ id, path, name }) => (
                            <li className="nav-item" key={id}>
                                <Link
                                    className={`nav-link ${
                                        pathname === path ? "active" : ""
                                    }`}
                                    to={path}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

// Header.propTypes = {};

export default NavBar;

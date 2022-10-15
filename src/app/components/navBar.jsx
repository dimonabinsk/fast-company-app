import React from "react";
import { NavLink } from "react-router-dom";

// import PropTypes from "prop-types";

const NavBar = () => {
    const linkList = [
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
                        {linkList.map(({ id, path, name }, i) => (
                            <li className="nav-item" key={id}>
                                {i === 0 ? (
                                    <NavLink
                                        exact
                                        to={path}
                                        className="nav-link"
                                    >
                                        {name}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        strict
                                        to={path}
                                        className="nav-link"
                                    >
                                        {name}
                                    </NavLink>
                                )}
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

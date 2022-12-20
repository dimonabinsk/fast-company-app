import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

// import PropTypes from "prop-types";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">
                                Главная
                            </NavLink>
                        </li>
                        {currentUser && (
                            <li className="nav-item">
                                <NavLink
                                    strict
                                    to="/users"
                                    className="nav-link"
                                >
                                    Быстрые встречи
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {currentUser ? (
                            <NavProfile/>
                        ) : (
                            <NavLink strict to="/login" className="nav-link">
                                Авторизация
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

// Header.propTypes = {};

export default NavBar;

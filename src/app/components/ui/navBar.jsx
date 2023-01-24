import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

// import PropTypes from "prop-types";

const NavBar = () => {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());
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
                        {isLoggedIn && (
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
                        {isLoggedIn ? (
                            <NavProfile />
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

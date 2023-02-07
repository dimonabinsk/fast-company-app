import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                className="nav-link"
                                aria-current="page"
                            >
                                Главная
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <NavLink
                                    strict
                                    to="/users"
                                    className="nav-link"
                                    aria-current="page"
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
                            <NavLink
                                strict
                                to="/login"
                                className="nav-link"
                                aria-current="page"
                            >
                                Авторизация
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;

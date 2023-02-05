import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getCurrentUserData } from "../../store/users";
import SpinnerLoading from "../common/spinnerLoading";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());

    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    return !currentUser ? (
        <SpinnerLoading />
    ) : (
        <div className="dropdown" onClick={toggleMenu} onMouseOut={closeMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="rounded-circle shadow-1-strong me-3 img-responsive"
                    alt="avatar"
                    width="35"
                    height="35"
                />
            </div>
            <div className={`w-100 dropdown-menu${isOpen ? " show" : ""}`}>
                <NavLink
                    to={`/users/${currentUser._id}`}
                    strict
                    className="dropdown-item"
                >
                    Профиль
                </NavLink>
                <NavLink to="/logout" strict className="dropdown-item">
                    Выйти из профиля
                </NavLink>
            </div>
        </div>
    );
};

export default NavProfile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useAuth } from "../../hooks/useAuth";
import { getCurrentUserData } from "../../store/users";
import SpinnerLoading from "../common/spinnerLoading";

const NavProfile = () => {
    // const { currentUser } = useAuth();
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };

    if (!currentUser) return <SpinnerLoading />;
    return (
        <div className="dropdown" onClick={toggleMenu}>
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
            <div className={`w-100 dropdown-menu${isOpen ? " show" : ""} `}>
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

// NavProfile.propTypes = {};

export default NavProfile;

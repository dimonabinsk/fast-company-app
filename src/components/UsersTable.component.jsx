import React from "react";
import PropTypes from "prop-types";
import User from "./User.component";

const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
    const handlerSort = (item) => {
        if (currentSort.iter === item) {
            onSort({ ...currentSort, order: currentSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    return (
        <table className="table table-light text-center">
            <thead>
                <tr>
                    <th onClick={() => handlerSort("name")} scope="col" role={"button"}>Имя</th>
                    <th scope="col">Качества</th>
                    <th onClick={() => handlerSort("profession.name")} scope="col">Профессия</th>
                    <th onClick={() => handlerSort("completedMeetings")} scope="col">Встретился,раз</th>
                    <th onClick={() => handlerSort("rate")} scope="col">Оценка</th>
                    <th onClick={() => handlerSort("bookmark")} scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User key={user._id} {...user} {...rest} />
                ))}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default UsersTable;

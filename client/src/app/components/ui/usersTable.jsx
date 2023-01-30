import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table, { TableBody, TableHeader } from "../common/table";
import Bookmark from "../common/bookmark";
import QualitiesCard from "./qualities";
import Rate from "../common/rate";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link
                    to={`/users/${user._id}`}
                    className="nav-link link-secondary"
                >
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesCard qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка",
            component: (user) => <Rate rate={user.rate} />
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
        // delete: {
        //     component: (user) => (
        //         <button
        //             className="btn btn-danger p-1"
        //             onClick={() => onDelete(user._id)}
        //         >
        //             Удалить
        //         </button>
        //     )
        // }
    };
    return (
        <Table>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ data: users, columns }} />
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
    // onDelete: PropTypes.func.isRequired
};

export default UsersTable;

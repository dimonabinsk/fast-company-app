import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table, { TableBody, TableHeader } from "../common/table";
import Bookmark from "../common/bookmark";

import Rate from "../common/rate";
import Profession from "./profession";
import QualitiesList from "./qualities/qualitiesList";

const UsersTable = ({ users, onSort, selectedSort }) => {
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
            component: (user) => <QualitiesList qualities={user.qualities} />
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
            component: (user) => <Bookmark userBookmarkId={user._id} />
        }
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
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import API from "../api";
import Pagination from "./Pagination.component";
import UsersTable from "./UsersTable.component";
import { paginate } from "../utility/pagination";
import SearchStatus from "./SearchStatus.component";
import GroupList from "./GroupList.component";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlerProfessionalSelect = (item) => {
        setSelectedProf(item);
    };

    const handlerPageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handlerSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => {
            return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
        })
        : allUsers;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const pageEpisodes = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {profession
                ? (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={profession}
                            selectedItem={selectedProf}
                            onItemSelect={handlerProfessionalSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                        Очистить
                        </button>
                    </div>
                )
                : (
                    <div>Загрузка данных...</div>
                )}
            <div className="d-flex flex-column p-3">
                <SearchStatus length={count} />
                {count > 0 && (
                    <UsersTable
                        users={pageEpisodes}
                        onSort={handlerSort}
                        currentSort={sortBy}
                        {...rest}/>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlerPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default Users;

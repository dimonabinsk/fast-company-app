import React, { useState, useEffect } from "react";
import _ from "lodash";

import Pagination from "../../common/pagination";
import UsersTable from "../../ui/usersTable";
import { paginate } from "../../../utility/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import SpinnerLoading from "../../common/spinnerLoading";
import SearchQuery from "../../common/form/searchQuery/searchQuery";
import { useSelector } from "react-redux";

import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

import {
    getCurrentUserId,
    getUsersList
} from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserID = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, isSearch]);

    const handleProfessionalSelect = (item) => {
        setSelectedProf(item);
        if (isSearch !== "") setSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = ({ target }) => {
        setCurrentPage(1);
        setSelectedProf(undefined);
        setSearch(target.value);
    };

    if (users) {
        function filterUsers(data) {
            const filteredUsers = isSearch
                ? data.filter((user) => {
                      const name = user.name.toLowerCase();
                      const search = isSearch.toLowerCase();
                      return name.indexOf(search) !== -1;
                  })
                : selectedProf
                ? data.filter((user) => {
                      return (
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf._id)
                      );
                  })
                : data;

            return filteredUsers.filter((user) => user._id !== currentUserID);
        }

        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const pageEpisodes = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf(undefined);
            setSearch("");
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionalSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column p-3">
                    <SearchStatus length={count} />
                    <SearchQuery onSearch={handleSearch} value={isSearch} />
                    {count > 0 && (
                        <UsersTable
                            users={pageEpisodes}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            // onToggleBookMark={handlerToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return <SpinnerLoading />;
};

export default UsersListPage;

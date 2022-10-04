import React, { useState, useEffect } from "react";
import _ from "lodash";
import API from "../../api";
import Pagination from "./pagination";
import UsersTable from "./usersTable";
import { paginate } from "../utility/pagination";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";
import SpinnerLoading from "./spinnerLoading";

const Users = () => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handlerToggleBookMark = (userId) => {
        const newUsers = users.map((user) => {
            if (userId === user._id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newUsers);
    };

    const handlerDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

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

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => {
                return (
                    JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
                );
            })
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const pageEpisodes = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {profession && (
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
                )}
                <div className="d-flex flex-column p-3">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={pageEpisodes}
                            onSort={handlerSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handlerToggleBookMark}
                            onDelete={handlerDelete}
                        />
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
    }

    return <SpinnerLoading />;
};

export default Users;

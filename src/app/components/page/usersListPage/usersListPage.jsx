import React, { useState, useEffect } from "react";
import _ from "lodash";

// import API from "../../../../api";
import Pagination from "../../common/pagination";
import UsersTable from "../../ui/usersTable";
import { paginate } from "../../../utility/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import SpinnerLoading from "../../common/spinnerLoading";
import SearchQuery from "../../common/form/searchQuery/searchQuery";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const pageSize = 4;
    const { isLoading: professionsLoading, professions } = useProfessions();
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    // const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [isSearch, setSearch] = useState("");
    // const [users, setUsers] = useState();
    // useEffect(() => {
    //     API.users.fetchAll().then((data) => setUsers(data));
    // }, []);

    const { users } = useUser();

    const handlerToggleBookMark = (userId) => {
        const newUsers = users.map((user) => {
            if (userId === user._id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        // setUsers(newUsers);
        // console.log(newUsers);
        return newUsers;
    };

    // const handleDelete = (userId) => {
    //     // setUsers(users.filter((user) => user._id !== userId));
    //     console.log(userId);
    // };

    // useEffect(() => {
    //     API.professions.fetchAll().then((data) => setProfession(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, setSearch]);

    const handleProfessionalSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
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
                          JSON.stringify(selectedProf)
                      );
                  })
                : data;

            return filteredUsers.filter((user) => user._id !== currentUser._id);
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
                            onToggleBookMark={handlerToggleBookMark}
                            // onDelete={handleDelete}
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

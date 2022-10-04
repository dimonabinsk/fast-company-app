import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../api";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utility/pagination";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

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
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => {
            return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
        })
        : allUsers;

    const count = filteredUsers.length;

    const pageEpisodes = paginate(filteredUsers, currentPage, pageSize);

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
                    <span>Загрузка данных...</span>
                )}
            <div className="d-flex flex-column p-3">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table table-light text-center">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился,раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageEpisodes.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
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

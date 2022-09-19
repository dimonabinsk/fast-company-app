import React, { useState } from "react";
import Pagination from "./Pagination.component";
import User from "./User.component";
import { paginate } from "../utility/pagination";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlerPageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // console.log(pageIndex);
    };

    // console.log(currentPage);

    const pageEpisodes = paginate(users, currentPage, pageSize);
    // console.log(pageEpisodes);

    return (
        <>
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlerPageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;

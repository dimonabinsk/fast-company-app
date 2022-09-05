import React, { useState } from "react";
import api from "../api";
import { declinationOfTheString } from "../utility/declination";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handlerRowChange = (item) => {
    setUsers((prevState) => prevState.filter((row) => row !== item));
  };

  const changeStr = () => {
    const arrMen = ["человек", "человека", "человек"];
    const count = users.length;
    const strMen = `${declinationOfTheString(
      count,
      arrMen
    )} с тобой сегодня тусанёт`;

    return strMen;
  };

  const renderTable = () => {
    return (
      <>
        <span className="badge bg-primary px-3 py-2 m-2">
          {users.length}
          <span className="mx-2">{changeStr()}</span>
        </span>
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился,раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge  bg-${quality.color} me-1`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`5/${user.rate}`}</td>
                <td>
                  <button
                    className="btn btn-danger p-1"
                    onClick={() => handlerRowChange(user)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  if (users.length !== 0) {
    return <>{renderTable()}</>;
  }

  return (
    <span className="badge bg-danger px-3 py-2 m-2">
      Никто с тобой не тусанёт
    </span>
  );
};

export default Users;

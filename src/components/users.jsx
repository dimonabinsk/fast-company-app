import React, { useState } from "react";
import api from "../api";
import { declinationOfTheString } from "../utility/declination";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handlerRowChange = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const changeStr = (count) => {
    const arrMan = ["человек тусанёт", "человека тусанут"];
    const strMan = `${declinationOfTheString(count, arrMan)}`;
    return strMan;
  };

  return (
    <>
      <h2>
        <span
          className={`badge ${
            users.length > 0 ? "bg-primary" : "bg-danger"
          } mx-2`}
        >
          {users.length > 0
            ? `${users.length} ${changeStr(users.length)} с тобой сегодня`
            : "Никто с тобой не тусанёт"}
        </span>
      </h2>
      {users.length > 0 && (
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
                    onClick={() => handlerRowChange(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handlerDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handlerToggleBookmark = (userId) => {
        const newUsers = users.map((user) => {
            if (userId === user._id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newUsers);
    };

    return (
        <div className="container mt-3">
            {users
                ? (
                    <Users
                        users={users}
                        onHandlerRowChange={handlerDelete}
                        onHandlerBookmark={handlerToggleBookmark}
                    />
                )
                : (<div>Загрузка данных...</div>)
            }
        </div>
    );
}

export default App;

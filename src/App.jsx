import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import API from "./api";
import SearchStatus from "./components/SearchStatus.component";
import Users from "./components/Users";

function App() {
  const initialStateUsers = API.users.fetchAll();
  const [users, setUsers] = useState(initialStateUsers);

  const handlerRowChange = (userId) => {
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
    <div className=" m-3">
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onHandlerRowChange={handlerRowChange}
        onHandlerBookmark={handlerToggleBookmark}
      />
    </div>
  );
}

export default App;

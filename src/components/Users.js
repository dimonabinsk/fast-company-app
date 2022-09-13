import React, { useState } from "react";
import API from "../api";
import SearchStatus from "./SearchStatus.component";
import User from "./User.component";

const Users = () => {
  const initialStateUsers = API.users.fetchAll();
  const [users, setUsers] = useState(initialStateUsers);

  const handlerRowChange = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handlerBookmark = (userId) => {
    const newUsers = users.map((user) => {
      if (userId === user._id) {
        user.bookmark = !user.bookmark;
      }

      return user;
    });

    setUsers(newUsers);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <User
        users={users}
        onHandlerRowChange={handlerRowChange}
        onHandlerBookmark={handlerBookmark}
      />
    </>
  );
};

export default Users;

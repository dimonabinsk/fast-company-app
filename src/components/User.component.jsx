import Characteristic from "./Characteristic.component";
import Bookmark from "./Bookmark.component";

const User = (props) => {
  const { users, onHandlerRowChange, onHandlerBookmark } = props;

  return (
    <>
      {users.length > 0 && (
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
            {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                  <Characteristic characteristics={user.qualities} />
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`5/${user.rate}`}</td>
                <td>
                  <Bookmark
                    id={user._id}
                    mark={user.bookmark}
                    onHandler={onHandlerBookmark}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger p-1"
                    onClick={() => onHandlerRowChange(user._id)}
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

export default User;

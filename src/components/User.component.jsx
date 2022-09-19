import Characteristic from "./Characteristic.component";
import Bookmark from "./Bookmark.component";

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onHandlerBookmark,
    onHandlerRowChange,
  } = props;

  return (
    <tr key={_id}>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((quality)=>(
            <Characteristic key={quality._id} {...quality}/>
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{`5/${rate}`}</td>
      <td>
        <Bookmark id={_id} mark={bookmark} onHandler={onHandlerBookmark} />
      </td>
      <td>
        <button
          className="btn btn-danger p-1"
          onClick={() => onHandlerRowChange(_id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;

import { changeStr } from "../utility/declination";

const SearchStatus = (props) => {
  return (
    <h2>
      <span
        className={`badge ${
          props.length > 0 ? "bg-primary" : "bg-danger"
        } mx-2`}
      >
        {props.length > 0
          ? `${props.length} ${changeStr(props.length)} с тобой сегодня`
          : "Никто с тобой не тусанёт"}
      </span>
    </h2>
  );
};

export default SearchStatus;

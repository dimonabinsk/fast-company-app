import React from "react";
import PropTypes from "prop-types";

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
        onHandlerRowChange
    } = props;

    return (
        <tr key={_id}>
            <th scope="row">{name}</th>
            <td>
                {qualities.map((quality) => (
                    <Characteristic key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{`5/${rate}`}</td>
            <td>
                <Bookmark
                    id={_id}
                    mark={bookmark}
                    onHandler={onHandlerBookmark}
                />
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

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onHandlerBookmark: PropTypes.func.isRequired,
    onHandlerRowChange: PropTypes.func.isRequired
};

export default User;

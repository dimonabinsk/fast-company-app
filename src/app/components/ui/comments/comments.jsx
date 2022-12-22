import React from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

// import API from "../../../../api";
import AddCommentForm from "../../page/userPage/addCommentForm";
import CommentsList from "../../page/userPage/commentsList";
import { useComments } from "../../../hooks/useComments";

const Comments = ({ userId }) => {
    // const [comments, setComments] = useState([]);
    const { createComment, comments } = useComments();

    // useEffect(() => {
    //     API.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data));
    // }, []);

    const handleAddComment = (data) => {
        // API.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...isComments, data]));
        createComment(data);
    };

    const handleDeleteComment = (commentId) => {
        // API.comments.remove(commentId).then((data) => {
        //     setComments((prev) => {
        //         return prev.filter(({ _id }) => _id !== data);
        //     });
        // });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAddComment={handleAddComment} />
                </div>
                {sortedComments.length > 0 && (
                    <div className="card-footer">
                        <div className="card">
                            <h2 className="text-center lh-lg">Комментарии</h2>
                            {/* <hr /> */}
                            <CommentsList
                                onDeleteComment={handleDeleteComment}
                                isComments={sortedComments}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;

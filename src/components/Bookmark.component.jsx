const Bookmark = ({ id, onHandler, mark }) => {
  return (
    <>
      <button className="btn btn-sm" onClick={() => onHandler(id)}>
        {mark ? (
          <i className="bi bi-emoji-heart-eyes-fill fs-2 text-primary"></i>
        ) : (
          <i className="bi bi-emoji-heart-eyes fs-2"></i>
        )}
      </button>
    </>
  );
};

export default Bookmark;

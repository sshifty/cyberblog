import moment from "moment";

const Comment = (props) => {
  const { comment, user, timestamp } = props.comment;

  return (
    <div className="main-container">
      <div className="comment-detail">
        <div className="comment-detail-container">
          <p>{comment}</p>
        </div>
        <div className="comment-detail-info">
          <span>
            <em>
              <strong>{user.username}</strong>, on{" "}
              {moment(timestamp).format("YYYY/MM/DD, h:mm a")}
            </em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

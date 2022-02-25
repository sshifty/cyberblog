import moment from "moment";
import { useNavigate } from "react-router-dom";
import he from "he";

const Post = (props) => {
  const { title, post, user, timestamps, comment, _id } = props.post;
  const navigate = useNavigate();
  
  return (
    <div className="main-container">
      <div className="post-card">
        <div className="postcard-container">
          <div  className="post-header">
            <div className="post-header-left">
              <h2>{title}</h2>
              <div className="post-header-info">
                <em>
                  <span>
                    Posted by <strong>{user.username} </strong>
                  </span>
                  <span>
                    on {moment(timestamps).format("YYYY/MM/DD, h:mm a")}
                  </span>
                </em>
              </div>
            </div>
            <div className="post-header-right">
              <button onClick={() => navigate("/post/" + _id)} className="btn btn-signup">View</button>
            </div>
          </div>
          <div className="post-content">
            <p className="p-post">{he.decode(post)}</p>
            <p>{comment.length} comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

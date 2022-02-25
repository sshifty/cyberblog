import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import he from 'he';

const PostDetail = (props) => {
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [singlePost, setSinglePost] = useState();
  const { user } = props;
  const signIn = (
    <div className="mb-2 comment-warning">
      <h3>You have to sign in to leave a comment!</h3>
      <div className="comment-warning-btn">
        <Link to="/login">
          <button className="btn btn-sign">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-signup">Sign up</button>
        </Link>
      </div>
    </div>
  );
  async function getPost() {
    try {
      const res = await fetch("/api/users/post/" + params.id, {});

      const postData = await res.json();
      if (!res.ok) {
        if (res.status === 404 || res.status === 501) {
          setErrors(postData.status);
          throw { status: postData.status };
        } else {
          setErrors("Something went wrong");
          throw {
            status:
              "Some error occured on the server, try to refresh the page!",
          };
        }
      } else {
        setErrors(null);
        setSinglePost(postData);
      }
    } catch (e) {
      if (!e.status) {
        setErrors("Some error occured on the server, try to refresh the page!");
      }
    }
  }
  useEffect(() => {
    getPost();
  }, []);
  
  if (errors) {
    return <div className="error">{errors}</div>;
  } else if (!singlePost) {
    return <div className="loading-screen">Loading...</div>;
  } else {
    return (
      <div className="postdetail">
        <div className="main-container">
          <div className="postdetail-container">
            <div className="postdetail-header post-header">
              <h2>{singlePost.post.title}</h2>
              <div className="post-header-info">
                <span>
                  Posted by <strong>{singlePost.post.user.username}</strong>
                </span>
                <span>
                  {" "}
                  on{" "}
                  {moment(singlePost.post.timestamps).format(
                    "YYYY/MM/DD, h:mm a"
                  )}
                </span>
              </div>
            </div>
            <div className="postdetail-post">
              <p>{he.decode(singlePost.post.post)}</p>
            </div>
          </div>
        </div>
        <div className="comment-part">
          {user ? <CommentForm getPost={getPost} /> : signIn}
          <h4 className="mb-1">{singlePost.comment.length} comments</h4>
          <div className="postdetail-comments">
            {singlePost.comment.map((comment) => {
              return <Comment comment={comment} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default PostDetail;

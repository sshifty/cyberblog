import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentForm = (props) => {
  const [errors, setErrors] = useState({});
  const params = useParams();
  const token = localStorage.getItem("token");
  const { getPost } = props;
  const onSubmit = (e) => {
    e.preventDefault();
    async function postComment() {
      const res = await fetch("/api/users/post/" + params.id + "/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          comment: e.target.comment.value,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Something happened");
        console.log(res, data);
      } else {
        e.target.comment.value = "";
        getPost();
      }
    }
    postComment();
  };
  return (
    <div className="comment-form mb-2">
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            id="comment"
            placeholder="Comment your thoughts here"
            maxLength={200}
            required
          ></textarea>
        </div>
        <div className="btn-container">
          <button className="btn btn-submit btn-com">Submit Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

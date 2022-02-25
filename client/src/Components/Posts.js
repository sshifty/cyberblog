import { useState, useEffect } from "react";
import Post from "./Post";

const Posts = (props) => {
  const [ posts, setPosts ] = useState([])
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/users/posts");
        const fetchedPosts = await data.json();
        if (!data.ok) {
          throw new Error(data.status);
        }
        setPosts([...fetchedPosts.posts]);

        setError(null);
      } catch (e) {
        if (e.status) {
          setError("No posts Found");
        } else {
          setError("Something went wront, please refresh the page!");
        }
      }
    }
    fetchData();
  }, []);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!posts) {
    return <div>Loading..</div>;
  } else {
    return (
      <div className="posts">
        <div className="home-posts">
          {posts.map((post) => {
            return <Post post={post} />;
          })}
        </div>
      </div>
    );
  }
};

export default Posts;

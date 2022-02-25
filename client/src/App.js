import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SignUp from "./Components/Signup";
import PostDetail from "./Components/PostDetail";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

function App() {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("hello");
    const token = localStorage.getItem("token");
    if (token) {
      if (isExpired(token)) {
        localStorage.setItem("token", null);
        setUser(null);
      } else {
        setUser({
          id: decodeToken(token)._id,
          username: decodeToken(token).username,
        });
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home posts={posts} setPosts={setPosts} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/post/:id' element={<PostDetail user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { Link } from "react-router-dom";

const Nav = (props) => {
  const { user, setUser } = props;

  const logOut = () => {
    localStorage.setItem("token", null);
    setUser(null);
  };
  return (
    <nav className="navbar">
      <h1>CyberBlog</h1>
      {user ? (
        <div className="navbar-container">
          <h1 className="username">{user.username}</h1>

          <Link to="/">
            <p className="nav-a">Home</p>
          </Link>

          <button className="btn btn-logout" onClick={logOut}>
            Log out
          </button>
        </div>
      ) : (
        <div className="navbar-container">
          <Link to="/">
            <p className="nav-a">Home</p>
          </Link>
          <Link to="/login">
            <button className="btn btn-sign">Log In</button>
          </Link>
          <Link to="signup">
            <button className="btn btn-signup">Sign up</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

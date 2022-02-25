import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

const Login = (props) => {
  const { user, setUser } = props;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    };
    try {
      const res = await fetch("/api/auth/login", requestOptions);
      const data = await res.json();
      if (!res.ok) {
        throw { errors: data.info };
      } else {
        localStorage.setItem("token", data.token);
        setErrors({});
        setUser({
          id: decodeToken(data.token)._id,
          username: decodeToken(data.token).username,
        });
        navigate("/");
      }
    } catch (e) {
      //do something with error, put in serverError state and display
      setErrors(e.errors);
    }
  };
  return (
    <div className="form-container ">
      <div className="main-container">
        <div className="sub-container">
          <form onSubmit={onSubmit}>
            <div className="input-container">
              <label htmlFor="username" className="sign-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                minLength={4}
                maxLength={20}
              />
              <span className="span-form-error">{errors["nameErr"]}</span>
            </div>
            <div className="input-container">
              <label htmlFor="password" className="sign-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={4}
                maxLength={20}
              />
              <span className="span-form-error">{errors["pwErr"]}</span>
            </div>
            <div className="btn-container">
              <button className="btn btn-sub" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUser, setsignUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    async function signUp() {
      try {
        const res = await fetch("api/auth/signup", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(signUser),
        });
        const data = await res.json();
        console.log(res,data)
        if (!res.ok) {
          throw { errors: data.errors };
        } else {
          setErrors({});
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
        if (e.errors) {
          setErrors(e.errors);
        }
      }
    }
    signUp();
  };

  return (
    <div className="form-container">
      <div className="main-container">
        <div className="sub-container">
          <form onSubmit={onSubmit}>
            <div className="input-container">
              <label className="sign-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                required
                minLength={4}
                maxLength={20}
              />
              <span className="span-form-error">{errors["nameErr"]}</span>
            </div>
            <div className="input-container">
              <label className="sign-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                required
                minLength={8}
                maxLength={20}
              />
              <span className="span-form-error">{errors["pwErr"]}</span>
            </div>
            <div className="input-container">
              <label className="sign-label" htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                onChange={handleChange}
                required
                minLength={8}
                maxLength={20}
              />
              <span className="span-form-error">{errors["confErr"]}</span>
            </div>
            <div className="btn-container">
              <button className="btn btn-sign" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

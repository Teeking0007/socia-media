import "./Auth.css";
import { FaTwitter } from "react-icons/fa";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { logIn, signUp } from "../../store/action/AuthAction";
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    username: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword ? dispatch(signUp(data)) : setConfirmPass(false);
      setData({
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword: "",
        username: "",
      })
    } else {
      dispatch(logIn(data))
      setData({
        password: "",
        username: "",
      })
    }
  }
  return (
    <div className="auth">
      {/* right side*/}
      <div className="auth-name">
        <FaTwitter style={{ color: "var(--orange)", fontSize: "4rem" }} />
        <div className="auth-text">
          <h2>Social Media</h2>
          <span>Have unlimited fun here!</span>
        </div>
      </div>

      {/* right side*/}
      <div className="auth-right">
        <div className="auth-form">
          <h3>{isSignUp ? "Sign up" : "Login"}</h3>
          <form className={isSignUp ? "signup" : "log-in"} onSubmit={handleSumbit} >
            {isSignUp && (
              <div className="s-input">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  onChange={changeHandler}
                  value={data.firstname}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={changeHandler}
                  value={data.lastname}
                />
              </div>
            )}

            <div className="s-input">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={changeHandler}
                value={data.username}
              />
            </div>
            <div className="s-input">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={changeHandler}
                value={data.password}
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  onChange={changeHandler}
                  value={data.confirmpassword}
                />
              )}
            </div>
            <span style={{display: confirmPass? 'none' : 'flex', color: 'red', alignSelf: 'flex-end'}}>
              * password doesn't match!
            </span>
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setIsSignUp((prev) => !prev)}
              >
                {isSignUp
                  ? "Already have an account? Login!"
                  : " Don't have an account? Sign up"}
              </span>
            </div>
            <button
              className={isSignUp ? "button signup-btn" : "button log-btn"}
            >
              {isSignUp ? "Signup" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

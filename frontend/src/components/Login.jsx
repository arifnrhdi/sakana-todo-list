import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/AuthSlice.js";
import Logo from "../img/sakana.png";
import { Link } from "react-router-dom";
import "../Auth.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/task/add");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>
      <div className="row bg-white border rounded-4 p-4 shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img src={Logo} alt="fish" className="img-fluid img" />
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <form onSubmit={Auth}>
              <div className="header-text mb-4">
                <h2>Log In</h2>
              </div>
              <div>{isError && <p className="text-danger">{message}</p>}</div>
              <div className="input-group mb-4">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group mb-4">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="input-group mb-4">
                <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className="row text-center">
              <small>
                Don't have account? <Link to="/register">Register</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

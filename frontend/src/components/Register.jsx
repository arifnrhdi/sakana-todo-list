import React, { useState } from "react";
import Logo from "../img/sakana.png";
import "../Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role] = useState("user");
  const [msg, setMsg] = useState("");
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const UserRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2257/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <HelmetProvider>
        <Helmet>
          <title>Register</title>
        </Helmet>
      </HelmetProvider>
      <div className="row bg-white border rounded-4 p-4 shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img src={Logo} className="img-fluid img" alt="Fish" />
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <form onSubmit={UserRegister}>
              <div className="header-text mb-4">
                <h2>Register</h2>
              </div>
              <div>
                <p className="text-danger">{msg}</p>
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="input-group mb-3">
                <input type="Password" className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
            <div className="row text-center">
              <small>
                Already have account? <Link to="/login">Log In</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

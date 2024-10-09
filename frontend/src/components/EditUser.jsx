import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../img/sakana.png";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:2257/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword);
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [id]);

  const UserEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2257/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row bg-white border rounded-4 p-4 shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img src={Logo} className="img-fluid img" alt="Fish" />
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <form onSubmit={UserEdit}>
              <div className="header-text mb-4">
                <h2>Edit User</h2>
              </div>
              <div>
                <p className="text-danger"></p>
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
                <button className="btn btn-lg btn-primary w-100 fs-6">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

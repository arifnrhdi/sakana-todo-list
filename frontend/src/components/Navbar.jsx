import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/AuthSlice.js";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);

  const LogOut = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate('/login');
  }


  const hamBurger = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };
  return (
    <div>
      <nav className="py-2 mb-3 border-bottom border-dark border-opacity-25 shadow-sm fixed-top">
        <div className="container-fluid px-5 d-grid gap-3 align-items-center" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <div className="d-flex flex-row">
            <button className="toggle-btn border rounded" type="button" onClick={hamBurger}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 18 18">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
              </svg>
            </button>
          </div>

          <div className="d-inline-flex container align-items-center justify-content-end">
            <div className="col-md-3 text-end">
              <button className="btn btn-sm button text-white fw-medium"  onClick={LogOut}>
                {" "}
                Log Out{" "}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

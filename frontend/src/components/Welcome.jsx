import React from "react";
import Logo from "../img/sakana.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container-fluid bg-white p-3 pt-5 box-area text-center flex-wrap" style={{ height: "100vh" }}>
      <p className="fs-1 fw-semibold mx-5 mt-5">Build Your To-do List</p>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eveniet eum magni amet deleniti praesentium, aut laborum, pariatur minima commodi excepturi, dolore harum voluptas eligendi voluptate quae qui eaque? Veritatis!
        </p>
        <div className="d-sm-flex justify-content-sm-center mb-5">
          <Link to={"/login"} className="btn btn-outline-dark btn-lg px-4">
            Get Started
          </Link>
        </div>
      </div>
      <div className="overflow-hidden" style={{ maxHeight: "44vh" }}>
        <div className="container px-5">
          <img src={Logo} className="img-fluid mb-4" alt="Logo" width="600" height="700" loading="lazy" style={{ marginTop: "-160px" }} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;

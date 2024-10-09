import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const Layout = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="d-flex" style={{ marginTop: "50px", width: "100%"}}>
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-grow-1 children">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout
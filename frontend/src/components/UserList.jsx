import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:2257/users");
    setUsers(response.data);
  };

  const deleteUsers = async (userId) => {
    await axios.delete(`http://localhost:2257/users/${userId}`);
    getUsers();
  }

  return (
    <div className="container mt-3 bg-white border rounded-4 p-4 shadow box-area">
      <HelmetProvider>
        <Helmet>
          <title>To-do List | User List</title>
        </Helmet>
      </HelmetProvider>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link>
                  <button onClick={() => deleteUsers(user.uuid)} className="btn btn-outline-danger fw-semibold btn-sm ms-2">
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

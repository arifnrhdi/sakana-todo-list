import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Task.css";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTasks = async () => {
    const response = await axios.get("http://localhost:2257/todos");
    setTasks(response.data);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:2257/todo/${taskId}`);
    getTasks();
  };

  return (
    <div className="container mt-3 bg-white border rounded-4 p-4 shadow box-area">
      <HelmetProvider>
        <Helmet>
          <title>To-do List | Task List</title>
        </Helmet>
      </HelmetProvider>
      <div className="row mb-2">
        {tasks.map((user, index) => (
          <div key={user.uuid} className="col-lg-3 col-sm-6 col-md-4 card-group text-break justify-content-evenly">
            <div className="row g-0 border border-dark border-opacity-25 shadow rounded-4 overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h4 className="mb-1">{user.title}</h4>
                <div className="mb-1 text-body-secondary">Created by {user.user.name}</div>
                <p className="mb-2 small">{user.updatedAt}</p>
                <p className="card-text mb-auto">{user.task}</p>
                <div className=" pt-3">
                  <Link to={`/task/edit/${user.uuid}`} className="btn btn-outline-info fw-semibold btn-sm">
                    Edit
                  </Link>
                  <Link>
                    <button onClick={() => deleteTask(user.uuid)} className="btn btn-outline-danger fw-semibold btn-sm ms-2">
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

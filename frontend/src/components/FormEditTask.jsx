import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

const FormEditTask = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTaskById = async () => {
      try {
        const response = await axios.get(`http://localhost:2257/todo/${id}`);
        setTitle(response.data.title);
        setTask(response.data.task);
      } catch (error) {
        console.log(error);
      }
    };
    getTaskById();
  }, [id]);

  const editTask = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2257/todo/${id}`, {
        title: title,
        task: task,
      });
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 add-user-box bg-white border rounded-4 p-4 shadow box-area">
      <HelmetProvider>
        <Helmet>
          <title>To-do List | Edit</title>
        </Helmet>
      </HelmetProvider>
      <form onSubmit={editTask}>
        <p className="h2 mb-5">Edit</p>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTask" className="form-label">
            Task
          </label>
          <textarea
            className="form-control text-area"
            id="floatingTextarea"
            style={{ height: "310px" }}
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default FormEditTask;

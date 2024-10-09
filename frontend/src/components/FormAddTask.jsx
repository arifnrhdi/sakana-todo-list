import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const FormAddTask = () => {
  const {user} = useSelector((state)=> state.auth);
  const [title, setTitle] = useState("")
  const [task, setTask] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate();

  const addTask = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2257/todos", {
        title: title,
        task: task
      });
      navigate("/tasks");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>To-do List | Add Task</title>
        </Helmet>
      </HelmetProvider>
      <div className="container mt-3 mb-3 bg-white border rounded-4 p-2 pt-3 shadow box-area text-center">
        <p className="fs-2 fw-semibold align-items-center">Welcome {user && user.name}!</p>
      </div>
      <div className="container add-user-box bg-white border rounded-4 p-4 shadow box-area">
        <form onSubmit={addTask}>
          <p className="h2 mb-4">Add</p>
          <p className="text-danger mb-3">{msg}</p>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputTask" className="form-label">
              Task
            </label>
            <textarea className="form-control text-area" id="floatingTextarea" value={task} onChange={(e) => setTask(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default FormAddTask
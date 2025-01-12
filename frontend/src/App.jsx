import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import UpdateUser from "./pages/UpdateUser";
import Register from "./components/Register";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/user/edit/:id' element={<UpdateUser/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/task/add" element={<AddTask/>}/>
          <Route path="/task/edit/:id" element={<EditTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );   
}

export default App;

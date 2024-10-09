import express from "express";
import { getUsers, getUserByid, createUser, updateUser, deleteUser } from "../controllers/UserControllers.js";
import { verifyUser, Admin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, Admin, getUsers);
router.get("/users/:id", verifyUser, getUserByid);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, Admin, deleteUser);

export default router;
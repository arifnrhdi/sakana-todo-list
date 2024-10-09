import express from "express";
import { getTodos, getTodoById, createTodo, updateTodo, deletetodo } from "../controllers/CrudControllers.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/todos', verifyUser, getTodos);
router.get("/todo/:id", verifyUser, getTodoById);
// router.get("/todo/admin/:id", verifyUser, getTodoByIdAdmin);
router.post("/todos", verifyUser, createTodo);
router.patch("/todo/:id", verifyUser, updateTodo);
router.delete("/todo/:id", verifyUser, deletetodo);

export default router;

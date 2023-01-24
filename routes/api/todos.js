const express = require("express");
const { authByToken } = require("../../middleware/authByToken");
const {
  createNewTodo,
  getTodos,
  getTodo,
  deleteTodo,
} = require("../../controller/todos");

const todosRoute = express.Router();

todosRoute.get("/", authByToken, getTodos);
todosRoute.get("/:todoId", authByToken, getTodo);
todosRoute.delete("/:todoId", authByToken, deleteTodo);
todosRoute.post("/", authByToken, createNewTodo);

module.exports = { todosRoute };

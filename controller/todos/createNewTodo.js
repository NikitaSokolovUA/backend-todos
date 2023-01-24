const { Todos } = require("../../models/todos");

const createNewTodo = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { title, type } = req.body;

    const newTodo = await Todos.create({ title, type, owner: _id });

    res.status(201).json({ newTodo });
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewTodo };

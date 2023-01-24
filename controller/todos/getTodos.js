const { Todos } = require("../../models/todos");

const getTodos = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const allTodos = await Todos.find({ owner: _id });

    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodos };

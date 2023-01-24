const { Todos } = require("../../models/todos");

const getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { _id } = req.user;

    const todo = await Todos.findOne({ _id: todoId, owner: _id });

    if (!todo) {
      return res.status(404).json({ message: "todo in not found" });
    }

    res.status(200).json({ todo: todo });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodo };

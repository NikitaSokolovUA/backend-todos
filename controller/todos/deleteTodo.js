const { Todos } = require("../../models/todos");

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { _id } = req.user;

    const todo = await Todos.findOne({ _id: todoId, owner: _id });

    if (!todo) {
      return res.status(404).json({ message: "todo in not found" });
    }

    await Todos.findOneAndDelete({ _id: todoId, owner: _id });

    res.status(200).json({ message: "todo is deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteTodo };

const mongoose = require("mongoose");
const { todosSchema } = require("../schema/mongooseSchema/todosSchema");

const Todos = mongoose.model("todos", todosSchema);

module.exports = { Todos };

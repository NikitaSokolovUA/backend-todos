const { Schema } = require("mongoose");

const todosSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: ["planning", "in progress", "done"],
      default: "planning",
    },
    type: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "authSchema",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = { todosSchema };

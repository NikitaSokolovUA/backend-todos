const mongoose = require("mongoose");
const authSchema = require("../schema/mongooseSchema/authSchema");

const Auth = mongoose.model("auths", authSchema);

module.exports = { Auth };

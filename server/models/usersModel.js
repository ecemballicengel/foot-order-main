const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    password: {
      type: String,
      require,
    },
    mail: {
      type: String,
      require,
    },
    isAdmin: {
      type: Boolean,
      require,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);
module.exports = usersModel;

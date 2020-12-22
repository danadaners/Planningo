const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "/assets/icons/misc/001-sofa.png",
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: "#9FE2BF",
  },
});

module.exports = Group;

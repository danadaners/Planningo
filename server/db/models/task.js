const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("tasks", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  isShopping: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  points: {
    type: Sequelize.INTEGER,
  },
  start: {
    type: Sequelize.DATEONLY
  },
  end: {
    type: Sequelize.DATEONLY
  },
  allDay: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Task;

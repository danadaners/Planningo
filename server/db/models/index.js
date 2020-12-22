const db = require("../db");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Category = require("./category");
const Point = require("./point");

const Sequelize = require("sequelize");

//ASSOCIATIONS
//**********USER AND GROUP --- USER_GROUP THROUGH TABLE ***********
const User_Group = db.define("User_Group", {
  role: {
    type: Sequelize.ENUM("admin", "member"),
    defaultValue: "member",
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: "#EAEACF",
  },
  // points: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  // },
});
User.belongsToMany(Group, { through: "User_Group" });
Group.belongsToMany(User, { through: "User_Group" });
//***************************************************************** */

//Task and Group --- one-to-many

Group.hasMany(Task), Task.belongsTo(Group);

const User_Task = db.define("User_Task", {});

User.belongsToMany(Task, { through: "User_Task" });
Task.belongsToMany(User, { through: "User_Task" });

//Categories
Category.hasMany(Task), Task.belongsTo(Category);

Group.hasMany(Category);
Category.belongsTo(Group);

// //Points
Task.hasOne(Point);
Point.belongsTo(Task);

Point.belongsTo(User);
User.hasMany(Point);

Point.belongsTo(Group);
Group.hasMany(Point);

Point.belongsTo(Category);

//export modules
module.exports = {
  db,
  User,
  Task,
  Group,
  User_Group,
  User_Task,
  Category,
  Point,
};

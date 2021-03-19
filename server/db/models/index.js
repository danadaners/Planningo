const db = require("../db");
const User = require("./user");
const Task = require("./task");
const Group = require("./group");
const Category = require("./category");
const Point = require("./point");

//ASSOCIATIONS
User.belongsTo(Group);
Group.hasMany(User);
Group.hasMany(Task), Task.belongsTo(Group);

User.hasMany(Task);
Task.belongsTo(User);

Category.hasMany(Task), Task.belongsTo(Category);

Group.hasMany(Category);
Category.belongsTo(Group);

Task.hasOne(Point);
Point.belongsTo(Task);

Point.belongsTo(User);
User.hasMany(Point);

Point.belongsTo(Group);
Group.hasMany(Point);

Point.belongsTo(Category);

module.exports = {
  db,
  User,
  Task,
  Group,
  Category,
  Point,
};

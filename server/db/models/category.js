const Sequelize = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://picsum.photos/100/100",
  },
  color: {
    type: Sequelize.ENUM(
      "#FFBF00",
      "#FF7F50",
      "#DE3163",
      "#9FE2BF",
      "#40E0D0",
      "#6495ED",
      "#CCCCFF"
    ),
    allowNull: false,
  },
  isShopping: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  categoryName: {
    type: Sequelize.STRING,
  },
});

module.exports = Category;

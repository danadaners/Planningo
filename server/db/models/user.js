const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatarUrl: {
    type: Sequelize.TEXT,
    defaultValue: "/assets/icons/users/002-girl.png",
  },
  //for protecting api routes
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isGroupAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
  googleId: {
    type: Sequelize.STRING,
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
    defaultValue: "#FFBF00",
  },
  currentPoints: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;

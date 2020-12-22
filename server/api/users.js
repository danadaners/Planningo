const router = require("express").Router();
const { User } = require("../db/models");
const Group = require("../db/models/group");

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("You don't have permission to view this page.");
  }
}

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "isAdmin"],
      include: {
        model: Group,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {
        model: Group,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", isAdmin, async (req, res, next) => {
  try {
    if (req.body.password) {
      try {
        await User.update(
          {
            password: req.body.password,
          },
          {
            where: {
              id: req.params.userId,
            },
          }
        );
      } catch (error) {
        next(error);
      }
    }

    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require("express").Router();
const {
  Group,
  User,
  Task,
  Category,
  Point,
} = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)

    const group = await Group.findOne({
      where: {
        id: user.groupId
      },
      include: [
        {
          model: User,
        },
        {
          model: Category,
        }
      ],
    })
    res.json([group]);
  } catch (err) {
    next(err);
  }
});

//GET single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//POST - create group
router.post("/", async (req, res, next) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      imageUrl: req.body.imageUrl
    });
    const user = await User.findByPk(req.user.id)

    await user.update({
        groupId: group.id
    });

    await Category.bulkCreate([
      {
        name: "Home",
        color: "#FFBF00",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/041-family.png",
      },
      {
        name: "Work",
        color: "#FF7F50",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/002-folders.png",
      },
      {
        name: "Finance",
        color: "#DE3163",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/026-business and finance.png",
      },
      {
        name: "School",
        color: "#CCCCFF",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/003-book.png",
      },
      {
        name: "Family",
        color: "#40E0D0",
        groupId: group.id,
        isShopping: false,
        imageUrl: "/assets/icons/misc/012-avatar.png",
      },

      {
        name: "Grocery",
        color: "#FFBF00",
        groupId: group.id,
        isShopping: true,
        imageUrl: "/assets/icons/misc/004-commerce and shopping.png",
      },
    ]);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//PUT group
router.put("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    group.update(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
});

//DELETE group
router.delete("/:groupId", async (req, res, next) => {
  try {
    await Group.destroy({
      where: { id: req.params.groupId },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// //POST USER to group
// router.post("/:groupId", async (req, res, next) => {
//   try {
//     const user = await User.findOrCreate({
//       where: {

//         email: req.body.email,
//       },
//     });
//     // const newUser = await User_Group.findOrCreate({
//     //   where: {
//     //     groupId: req.params.groupId,
//     //     userId: user.id,
//     //   },
//     // });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

// //DELETE USER from group
// router.delete("/:groupId/:userId", async (req, res, next) => {
//   try {
//     await User_Group.destroy({
//       where: {
//         groupId: req.params.groupId,
//         userId: req.params.userId,
//       },
//     });
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

// GET /api/groups/:groupId/tasks
router.get("/:groupId/tasks", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: User,
        },
        {
          model: Task,
          where: {
            isShopping: false,
          },
          required: false,
        },
        {
          model: Category,
          where: {
            isShopping: false,
          },
          required: false,
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.get("/:groupId/shopping", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: User,
        },
        {
          model: Task,
          where: {
            isShopping: true,
          },
          required: false,
        },
        {
          model: Category,
          where: {
            isShopping: false,
          },
          required: false,
        },
      ],
    });
    res.json(group);
  } catch (err) {
    next(err);
  }
});
//POST /api/groups/:groupId/shopping
router.post("/:groupId/shopping", async (req, res, next) => {
  try {
    const shopping = await Task.create({
      userId: req.body.userId,
      name: req.body.name,
      isShopping: true,
      groupId: req.body.groupId,
      categoryId: req.body.categoryId,
      start: new Date(),
      end: new Date(),
    });
    res.json(shopping);
  } catch (error) {
    next(error);
  }
});
// POST /api/groups/:groupId/tasks
router.post("/:groupId/tasks", async (req, res, next) => {
  try {
    const task = await Task.create({
      userId: req.body.userId,
      name: req.body.name,
      points: req.body.points,
      isShopping: false,
      categoryId: req.body.categoryId,
      groupId: req.body.groupId,
      start: req.body.selectedDate,
      end: req.body.selectedDate,
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// PUT /api/groups/:groupId/tasks
router.put("/:groupId/tasks", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.body.taskId);

    task.update({
      name: req.body.name,
      description: req.body.description,
      points: req.body.points,
      categoryId: req.body.categoryId,
      groupId: req.params.groupId,
      start: req.body.selectedDate,
      end: req.body.selectedDate,
      userId: req.body.userId,
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

//GET /api/groups/:groupId/rewards
router.get("/:groupId/rewards", async (req, res, next) => {
  try {
    const groupPoints = await Point.findAll({
      where: {
        groupId: req.params.groupId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(groupPoints);
  } catch (err) {
    next(err);
  }
});

//GET api/groups/:groupId/:userId/rewards
router.get("/:groupId/:userId/rewards", async (req, res, next) => {
  try {
    const userGroupPoints = await Point.findAll({
      where: {
        userId: req.params.userId,
        groupId: req.params.groupId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.send(userGroupPoints);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

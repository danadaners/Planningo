const router = require("express").Router();

const { Task, User_Task, Group, User, Category } = require("../db/models");

//GET /api/tasks/home
router.get("/home", async (req, res, next) => {
    const tasks = await req.user.getTasks();
    res.json(tasks);
});

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Group,
        },
        {
          model: Task,
          where: {
            isShopping: false,
          },
          required: false,
          include: {
            model: Category,
          },
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET Shopping list items
router.get("/shopping", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Group,
        },
        {
          model: Task,
          where: {
            isShopping: true,
          },
          required: false,
          include: {
            model: Category,
          },
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.taskId,
      },
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      points: req.body.points,
      shoppingId: null,
      categoryId: req.body.categoryId,
      groupId: req.body.groupId,
      start: req.body.selectedDate,
      end: req.body.selectedDate,
    });
    await User_Task.create({
      userId: req.user.id,
      taskId: task.id,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/shopping", async (req, res, next) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      name: req.body.name,
      isShopping: true,
      description: req.body.description,
      categoryId: req.body.categoryId,
      groupId: req.body.groupId,
      start: new Date(),
      end: new Date(),
    });
    await User_Task.create({
      userId: req.user.id,
      taskId: task.id,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.body.taskId);

    task.update({
      name: req.body.name,
      description: req.body.description,
      points: req.body.points,
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

//PATCH task
router.patch("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    const { updatedFields } = req.body;
    const userTask = await User_Task.findOne({
      where: {
        taskId: req.params.taskId,
      },
    });
    const user = await User.findOne({
      where: {
        id: userTask.userId,
      },
    });
    user.update({
      tasksCompleted: (user.tasksCompleted += 1),
    });
    task.update({ ...updatedFields });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.taskId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

import prisma from '../db';

export const getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      belongsToId: req.headers.user,
    },
  });

  res.json({ data: tasks });
};

export const createTask = async (req, res, next) => {
  try {
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        completed: req.body.completed,
        belongsToId: req.body.belongsToId,
      },
    });

    res.json({ task });
  } catch (e) {
    next(e);
  }
};

export const removeTask = async (req, res, next) => {
  try {
    const taskId = req.body.id;

    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required in the request body' });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.json({ deletedTask });
  } catch (error) {
    next(error);
  }
};

export const getOneTask = async (req, res) => {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: task });
};

export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.body.taskId;
    const newTitle = req.body.newTitle;

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: newTitle,
      },
    });

    res.json({ updatedTask });
  } catch (error) {
    next(error);
  }
};

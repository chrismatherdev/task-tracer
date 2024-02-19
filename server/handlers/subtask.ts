import prisma from '../db';

export const getSubtasks = async (req, res) => {
  const subtasks = await prisma.subTask.findMany({
    where: {
      taskId: req.headers.task,
    },
  });

  res.json({ data: subtasks });
};

export const createSubtask = async (req, res, next) => {
  try {
    const subtask = await prisma.subTask.create({
      data: {
        title: req.body.title,
        completed: req.body.completed,
        taskId: req.body.taskId,
      },
    });

    res.json({ subtask });
  } catch (e) {
    next(e);
  }
};

export const updateSubtask = async (req, res, next) => {
  try {
    const subtaskId = req.body.id;

    const updated = await prisma.subTask.update({
      where: {
        id: subtaskId,
      },
      data: {
        title: req.body.title,
        completed: req.body.completed,
      },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const removeSubtask = async (req, res, next) => {
  try {
    const subtaskId = req.body.id;

    if (!subtaskId) {
      return res.status(400).json({ error: 'Task ID is required in the request body' });
    }

    const deletedTask = await prisma.subTask.delete({
      where: {
        id: subtaskId,
      },
    });

    res.json({ deletedTask });
  } catch (e) {
    next(e);
  }
};

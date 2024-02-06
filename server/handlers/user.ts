import prisma from '../db';
import { createJWT, comparePasswords, hashPassword } from '../modules/auth';

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  console.log(user, 'user1111');

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'Incorrect password' });
    return;
  }

  if (!user) {
    res.status(404);
    res.json({ message: 'User not found.' });
    return;
  }

  const token = createJWT(user);
  res.json({ id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username, token });
};

export const register = async (req, res, next) => {
  console.log(req.body, 'req body');

  try {
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    console.log(user, 'user - prisma');

    const token = createJWT(user);
    res.json({ id: user.id, token });
  } catch (e) {
    next(e);
  }
};

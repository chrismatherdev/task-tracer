import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { login, register } from './handlers/user';
import { protect } from './modules/auth';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', protect, router);

app.get('/', (req, res) => {
  console.log('Hello from express!');
  res.status(200);
  res.json({ message: 'JSON' });
});

app.post('/register', register);
app.post('/login', login);

export default app;

import express from 'express';
import errorHandler from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import jokeController from '../controllers/jokeController'; 

const router = express.Router();

router.get('/random-joke', authMiddleware, jokeController.getRandomJoke); 

router.use(errorHandler);

export default router;

import express from 'express';
import userController from '../controllers/userController'; 
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post("/signup", userController.createUser); 
router.post("/login", userController.loginUser);  
router.get('/me', authMiddleware, userController.viewProfile); 
router.post('/logout', authMiddleware, userController.logoutUser); 

export default router;

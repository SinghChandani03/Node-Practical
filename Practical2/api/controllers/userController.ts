import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware';

interface CustomRequest extends Request {
  user?: User | null; 
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  
    const { password: _, ...userWithoutPassword } = newUser.get(); 
    res.status(201).json({ user: userWithoutPassword});
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ error: 'Email is invalid' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Password is invalid' });
      return;
    }

    const token = generateToken(user.userId.toString());
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const viewProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = req.user; 

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'User logged out successfully' });
};

export default { createUser, loginUser, viewProfile, logoutUser };

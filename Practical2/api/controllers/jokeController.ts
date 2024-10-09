import { Request, Response } from 'express';
import axios from 'axios';

const getRandomJoke = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching joke' });
    }
};

export default {getRandomJoke}
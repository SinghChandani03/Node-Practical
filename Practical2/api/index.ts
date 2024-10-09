import express from 'express';
import userRoutes from './routes/userRoutes'; 
import jokeRoutes from './routes/jokeRoutes'; 

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("<p>Server is running!</p>");
});

app.use("/api/users", userRoutes); 
app.use("/api", jokeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

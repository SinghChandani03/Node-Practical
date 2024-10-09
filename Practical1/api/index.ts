import express from 'express';
import router from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<p>Server Running Please go to /products to see result !</p>');
});

app.use('/products', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

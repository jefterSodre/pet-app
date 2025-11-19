import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import petsRoutes from './routes/pets';
import partnersRoutes from './routes/partners';
import productsRoutes from './routes/products';
import servicesRoutes from './routes/services';
import ordersRoutes from './routes/orders';
import appointmentsRoutes from './routes/appointments';
import reviewsRoutes from './routes/reviews';
import adminRoutes from './routes/admin';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);
app.use('/partners', partnersRoutes);
app.use('/products', productsRoutes);
app.use('/services', servicesRoutes);
app.use('/orders', ordersRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/admin', adminRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

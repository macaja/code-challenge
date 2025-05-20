import express from 'express';
import cors from 'cors';
import accountsRouter from './routes/accounts';
import paymentsRouter from './routes/payments';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/accounts', accountsRouter);
app.use('/api/payments', paymentsRouter);

export default app;

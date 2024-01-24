import express from 'express';
import {authRouter} from './v1/routers/auth.routes.js';
import cors from 'cors';
import {connect} from './config/db.js';

const app = express();
const PORT = 3035;

app.use(cors());
app.use(express.json());

connect();

app.use('/api/v1/auth', authRouter);

app.listen(PORT, ()=> console.log(`Server listening on http://localhost:${PORT}`))
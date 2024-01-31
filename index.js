import express from 'express';
import { authRouter } from './v1/routers/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './config/db.js';
import dotenv from 'dotenv';
import { getUser, verifyToken } from './v1/services/auth/token.js';
import { userRouter } from './v1/routers/user.routes.js';
import { decrypt } from './v1/services/enc_dec/encrypt-decrypt.js';
import { courseRouter } from './v1/routers/course.routes.js';
import { subjectRoutes } from './v1/routers/subject.routes.js';

const app = express();
const PORT = 3035;

dotenv.config();
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


connect();

app.use('/api/v1/mamcet/auth', authRouter);
app.use('/api/v1/course', verifyToken, getUser, courseRouter);
app.use('/api/v1/subject', verifyToken, getUser, subjectRoutes);
app.use('/api/v1/mamcet/user', verifyToken, getUser, userRouter);
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

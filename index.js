import express from 'express';
import { authRouter } from './v1/routers/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { connect } from './config/db.js';
import dotenv from 'dotenv';
import { userRouter } from './v1/routers/user.routes.js';
import { courseRouter } from './v1/routers/course.routes.js';
import { subjectRoutes } from './v1/routers/subject.routes.js';
import { batchRouter } from './v1/routers/batch.routes.js';
import { semesterRouter } from './v1/routers/semester.routes.js';
import { error } from './v1/middlewares/error.middleware.js';
import { checkAuthorization } from './v1/middlewares/auth.middleware.js';
import { decryptMiddleware } from './v1/middlewares/security.middleware.js';
import { getQueries } from './v1/controllers/queries.controller.js';
import { queryRoute } from './v1/routers/query.routes.js';
import { studentRoute } from './v1/routers/student.routes.js';
import { examRoutes } from './v1/routers/exam.routes.js';

const app = express();
const PORT = 3035;

dotenv.config();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({ limit: '10mb' }));

connect();

app.use(error);
app.use(checkAuthorization);
app.use(decryptMiddleware);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/subject', subjectRoutes);
app.use('/api/v1/batch', batchRouter);
app.use('/api/v1/queries', queryRoute);
app.use('/api/v1/semester', semesterRouter);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/exam', examRoutes);
app.use('/api/v1/user', userRouter);
app.use(error);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

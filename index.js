import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { v1AuthRouter } from './v1/routers/auth.routes.js';
import { v1UserRouter } from './v1/routers/user.routes.js';
import { v1CourseRouter } from './v1/routers/course.routes.js';
import { v1SubjectRoutes } from './v1/routers/subject.routes.js';
import { v1BatchRouter } from './v1/routers/batch.routes.js';
import { v1SemesterRouter } from './v1/routers/semester.routes.js';
import { v1QueryRoute } from './v1/routers/query.routes.js';
import { v1StudentRoute } from './v1/routers/student.routes.js';
import { v1ExamRoutes } from './v1/routers/exam.routes.js';
import { error } from './v1/middlewares/error.middleware.js';
import { checkAuthorization } from './v1/middlewares/auth.middleware.js';
import { decryptMiddleware } from './v1/middlewares/security.middleware.js';
import { connect } from './config/db.js';
import { v1Institution } from './v1/routers/institution.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

connect();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(error);
app.use(checkAuthorization);
app.use(decryptMiddleware);

// Version v1
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/course', v1CourseRouter);
app.use('/api/v1/subject', v1SubjectRoutes);
app.use('/api/v1/batch', v1BatchRouter);
app.use('/api/v1/queries', v1QueryRoute);
app.use('/api/v1/semester', v1SemesterRouter);
app.use('/api/v1/student', v1StudentRoute);
app.use('/api/v1/exam', v1ExamRoutes);
app.use('/api/v1/user', v1UserRouter);
app.use('/api/v1/institution', v1Institution);

app.use(error);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

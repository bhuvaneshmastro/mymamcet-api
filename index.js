import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Import routers and middleware
import { authRouter } from './v1/routers/auth.routes.js';
import { userRouter } from './v1/routers/user.routes.js';
import { courseRouter } from './v1/routers/course.routes.js';
import { subjectRoutes } from './v1/routers/subject.routes.js';
import { batchRouter } from './v1/routers/batch.routes.js';
import { semesterRouter } from './v1/routers/semester.routes.js';
import { queryRoute } from './v1/routers/query.routes.js';
import { studentRoute } from './v1/routers/student.routes.js';
import { examRoutes } from './v1/routers/exam.routes.js';
import { error } from './v1/middlewares/error.middleware.js';
import { checkAuthorization } from './v1/middlewares/auth.middleware.js';
import { decryptMiddleware } from './v1/middlewares/security.middleware.js';
import { connect } from './config/db.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3035;

// Load environment variables from .env file
dotenv.config();

// Validate CLIENT_URL environment variable
if (!process.env.CLIENT_URL) {
    console.error("CLIENT_URL environment variable is not defined.");
    process.exit(1);
}

// Configure middleware
var whitelist = [process.env.CLIENT_URL]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// Connect to database
connect();

// Register middleware and routers
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

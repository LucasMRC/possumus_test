import express, {
    Application,
    NextFunction,
    Request,
    Response
} from 'express';

// Utils
import { ErrorWithStatus } from '@utils/errors';

export default (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    console.log('💻 Express loaded!');
};

export const ErrorHandler = (
    err: ErrorWithStatus,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err.stack);
    res.status(err.status).json({
        status: err.status,
        message: err.message
    });
};
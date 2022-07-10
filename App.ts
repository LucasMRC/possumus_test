import 'reflect-metadata';
import express from 'express';

// Config
import configExpress, { ErrorHandler } from '@config/express';
import configRoutes from '@config/routes';

const app = express();

const PORT = process.env.PORT || 3000;

configExpress(app);
configRoutes(app);

app.use(ErrorHandler);


app.listen(PORT, () => {
    console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});

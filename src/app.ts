import express from 'express';
import bodyParser from 'body-parser'
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger, stream } from './utils/logger';
import {GamesRouter}  from './routes/games.router';


class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = 3000;
    }
    public async init() {
        try {
            this.initializeMiddlewares();
            this.initializeRoutes();
        } catch (e) {
            logger.error(`ERROR: ${e}`);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(morgan( 'dev', { stream }));
        this.app.use(compression());
        this.app.use(express.static(`${__dirname}/static`));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        const gamesRouter = new GamesRouter();
        this.app.use('/api/games', gamesRouter.router );
    }
}

export default App;

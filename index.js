import express from 'express';
import bodyParser from 'express';
import Routes from "./routes.js";
import {Redis as RedisConnection} from './redis/index.js'

class WebScraper {

    app;
    port;
    redisClient;

    constructor() {
        this.app = express();
        this.port = 4000;
        this.redisClient = new RedisConnection();
        this.middlewares();
        this.routes();
    }

    run() {
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port} http://localhost:${this.port}`);
            this.redisClient.connect();
        });
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use((req, res, next) => {
            console.log(req.method, req.url);
            next();
        });
    }

    routes() {
        this.app.use(new Routes(this.redisClient));
    }
}

const Scraper = new WebScraper();
Scraper.run();
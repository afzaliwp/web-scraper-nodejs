import express from 'express';
import bodyParser from 'express';
import Routes from "./routes.js";

class WebScraper {

    app;
    port;

    constructor() {
        this.app = express();
        this.port = 4000;
        this.middlewares();
        this.routes();
    }

    run() {
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port} http://localhost:${this.port}`);
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
        this.app.use(new Routes());
    }
}

const Scraper = new WebScraper();
Scraper.run();
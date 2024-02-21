import express from 'express';
import Scraper from './scraper.js';

class Routes {

    routes;

    constructor() {
        this.routes = express.Router();
        this.handleScrapeRoutes();

        return this.routes;
    }


    async handleScrapeRoutes() {
        this.routes.get('/scrape', async (req, res) => {
            const {url, elements} = req.body;
            const scraper = new Scraper(url, elements);
            const data = await scraper.scrape(req, res);

            res.json(data);
        });
    }
}

export default Routes;
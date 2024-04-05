import express from 'express';
import Scraper from './scraper.js';

class Routes {

    routes;

    constructor(redisClient) {
        this.routes = express.Router();
        this.redisClient = redisClient;
        this.handleScrapeRoutes();

        return this.routes;
    }


    async handleScrapeRoutes() {
        this.routes.get('/scrape', async (req, res) => {
            let {url, elements} = req.body;
            const result = {};
            const shouldBeReceived = {};
            const isCached = [];
            elements = JSON.parse(elements);

            for (let [key, value] of Object.entries(elements)) {
                const objectKey = `${url}|${key}`;
                const cache = await this.redisClient.get(objectKey);

                if ( cache ) {
                    result[key] = cache;
                    isCached.push(key);
                } else {
                    shouldBeReceived[key] = value;
                }
            }

            const scraper = new Scraper(url, shouldBeReceived);
            const data = await scraper.scrape(req, res);

            for (let [key, value] of Object.entries(data)) {
                const objectKey = `${url}|${key}`;

                await this.redisClient.set(objectKey, value);
            }

            console.log(isCached, result, data)
            res.json({
                isCached,
                ...result,
                ...data,
            });
        });
    }
}

export default Routes;
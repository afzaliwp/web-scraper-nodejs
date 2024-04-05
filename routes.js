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
            let {url, elements, useCache} = req.body;
            const result = {};
            let shouldBeReceived = {};
            const isCached = [];
            elements = JSON.parse(elements);

            if ( useCache && '1' === useCache) {
                useCache = true;
            } else {
                useCache = false;
            }

            if ( useCache ) {
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
            } else {
                shouldBeReceived = {
                    ...elements
                };
            }

            const scraper = new Scraper(url, shouldBeReceived);
            const data = await scraper.scrape(req, res);

            for (let [key, value] of Object.entries(data)) {
                const objectKey = `${url}|${key}`;

                await this.redisClient.set(objectKey, value);
            }

            res.json({
                isCached,
                ...result,
                ...data,
            });
        });
    }
}

export default Routes;
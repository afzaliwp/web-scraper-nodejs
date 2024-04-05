import axios from "axios";
import {load} from "cheerio";

class Scraper {
    url;
    elements;
    redisClient;

    /*
    elements: json key value pairs of the element name and element js path.
     */
    constructor(url, elements, redisClient) {
        this.url = url;
        this.elements = elements;
        this.redisClient = redisClient;
    }

    async scrape() {
        const data = {};

        for (const [key, jsPath] of Object.entries(this.elements)) {

            const pageData = await axios.get(this.url);
            const $ = load(pageData.data);

            data[key] = $(String(jsPath)).text();
        }

        return data;
    }
}

export default Scraper;
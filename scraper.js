import axios from "axios";
import {load} from "cheerio";

class Scraper {
    url;
    elements;

    /*
    elements: json key value pairs of the element name and element js path.
     */
    constructor(url, elements) {
        this.url = url;
        this.elements = JSON.parse(elements);
    }

    async scrape(req, res) {
        const data = [];

        for (const [key, jsPath] of Object.entries(this.elements)) {

            const pageData = await axios.get(this.url);
            const $ = load(pageData.data);

            const scrapeData = $(String(jsPath)).text();
            data.push({[key]: scrapeData});
        }

        return data;
    }
}

export default Scraper;
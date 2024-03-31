import {createClient} from 'redis';

class Redis {
    client;

    async constructor() {
        this.client = createClient();
        this.handleEvents();
    }

    handleEvents() {
        this.client.on(
            'error',
            err => {
                console.log('Redis Client Error', err)
            }
        );
    }

    async connect() {
        await this.client.connect();
    }
}
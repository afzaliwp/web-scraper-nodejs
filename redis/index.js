import {createClient} from 'redis';

class Redis {
    client;

    constructor() {
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
        this.client.on(
            'connect',
            () => {
                console.log('Redis Connected on default port.')
            }
        );
    }

    async connect() {
        await this.client.connect();
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value) {
        await this.client.set(key, value);
    }
}

export {
    Redis
}
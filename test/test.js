const request = require('supertest');
const assert = require('assert');
const app = require('../index');

/**
 * Testing create game endpoint
 */
describe('POST /api/games', () => {
    let data = {
        publisherId: "1234567890",
        name: "Test App",
        platform: "ios",
        storeId: "1234",
        bundleId: "test.bundle.id",
        appVersion: "1.0.0",
        isPublished: true
    }
    it('respond with 200 and an object that matches what we created', async () => {
        const { body, status } = await request(app)
            .post('/api/games')
            .set('Accept', 'application/json')
            .send(data)
        assert.strictEqual(status, 200);
        assert.strictEqual(body.publisherId, '1234567890');
        assert.strictEqual(body.name, 'Test App');
        assert.strictEqual(body.platform, 'ios');
        assert.strictEqual(body.storeId, '1234');
        assert.strictEqual(body.bundleId, 'test.bundle.id');
        assert.strictEqual(body.appVersion, '1.0.0');
        assert.strictEqual(body.isPublished, true);
    });
});

/**
 * Testing get all games endpoint
 */
describe('GET /api/games', () => {
    it('respond with json containing a list that includes the game we just created', async () => {
        const { body, status } = await request(app)
            .get('/api/games')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 200);
        assert.strictEqual(body[0].publisherId, '1234567890');
        assert.strictEqual(body[0].name, 'Test App');
        assert.strictEqual(body[0].platform, 'ios');
        assert.strictEqual(body[0].storeId, '1234');
        assert.strictEqual(body[0].bundleId, 'test.bundle.id');
        assert.strictEqual(body[0].appVersion, '1.0.0');
        assert.strictEqual(body[0].isPublished, true);
    });
});




/**
 * Testing SEARCH all games endpoint
 */


describe('POST /api/games/search',async () => {


        it(' name = Test App and platform = ios responds with 1 game', async () => {
            let data = {
                name: 'Test App',
                platform: 'ios'
            }
            const { body, status } = await request(app)
                .post('/api/games/search')
                .set('Accept', 'application/json')
                .send(data)
            assert.strictEqual(status, 200);
            assert.strictEqual(body.length, 1);
            assert.strictEqual(body[0].name, 'Test App');
            assert.strictEqual(body[0].platform, 'ios');
            assert.strictEqual(body[0].storeId, '1234');
            assert.strictEqual(body[0].bundleId, 'test.bundle.id');
            assert.strictEqual(body[0].appVersion, '1.0.0');
            assert.strictEqual(body[0].isPublished, true);
        });
    
        it(' name = Test App and platform = android responds with 1 game', async () => {
            let data = {
                name: 'Test App',
                platform: 'android'
            }
            const { body, status } = await request(app)
                .post('/api/games/search')
                .set('Accept', 'application/json')
                .send(data)
            assert.strictEqual(status, 200);
            assert.strictEqual(body.length, 0);
        });
        it(' name = not_found  App and platform = ios responds with 0 game', async () => {
            let data = {
                name: 'Not found',
                platform: 'ios'
            }
            const { body, status } = await request(app)
                .post('/api/games/search')
                .set('Accept', 'application/json')
                .send(data)
            assert.strictEqual(status, 200);
            assert.strictEqual(body.length, 0);
        });
        it('platform = ios and no name responds with 1 game', async () => {
            let data = {
                platform: 'ios'
            }
            const { body, status } = await request(app)
                .post('/api/games/search')
                .set('Accept', 'application/json')
                .send(data)
            assert.strictEqual(status, 200);
            assert.strictEqual(body.length, 1);
        });
        it('No parameters  responds with 1 game', async () => {
            let data = {
                platform: '',
                name: ''
            }
            const { body, status } = await request(app)
                .post('/api/games/search')
                .set('Accept', 'application/json')
                .send(data)
            assert.strictEqual(status, 200);
            assert.strictEqual(body.length, 1);
        });
});

/**
 * Testing update game endpoint
 */
describe('PUT /api/games/1', () => {
    let data = {
        id : 1,
        publisherId: "999000999",
        name: "Test App Updated",
        platform: "android",
        storeId: "5678",
        bundleId: "test.newBundle.id",
        appVersion: "1.0.1",
        isPublished: false
    }
    it('respond with 200 and an updated object', async () => {
        const { body, status } = await request(app)
            .put('/api/games/1')
            .set('Accept', 'application/json')
            .send(data)
        assert.strictEqual(status, 200);
        assert.strictEqual(body.publisherId, '999000999');
        assert.strictEqual(body.name, 'Test App Updated');
        assert.strictEqual(body.platform, 'android');
        assert.strictEqual(body.storeId, '5678');
        assert.strictEqual(body.bundleId, 'test.newBundle.id');
        assert.strictEqual(body.appVersion, '1.0.1');
        assert.strictEqual(body.isPublished, false);
    });
});

/**
 * Testing update game endpoint
 */
describe('DELETE /api/games/1', () => {
    it('respond with 200', async () => {
        const { body, status } = await request(app)
            .delete('/api/games/1')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 200);
        assert.strictEqual(body.id, 1);
    });
});

/**
 * Testing get all games endpoint
 */
describe('GET /api/games', () => {
    it('respond with json containing no games', async () => {
        const { body, status } = await request(app)
            .get('/api/games')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 200);
        assert.strictEqual(body.length, 0);
    });
});


describe('POST /api/games/populate', () => {
    it('respond with json containing no games', async () => {
        const {  status } = await request(app)
            .post('/api/games/populate')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 201);
    });
});

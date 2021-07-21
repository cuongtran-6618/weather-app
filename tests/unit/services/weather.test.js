/*const {
    fetchWeatherDataByCity,
    insertWeatherDataByCity,
    fetchWeatherDataByDate,
} = require('../../../services/weather');
const { MongoClient } = require('mongodb');

describe('Weather services', () => {
    describe('Client fetchs the weather data of a valid city name', () => {
        // should reponse with 200
        test('should response with 200 status', () => {});
    });
});

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        db = await connection.db(process.env.MONGO_DB_NAME);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');

        const mockUser = { _id: 'some-user-id', name: 'John' };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ _id: 'some-user-id' });
        expect(insertedUser).toEqual(mockUser);
    });
});
*/

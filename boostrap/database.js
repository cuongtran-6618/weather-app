const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        console.log('connect DB call');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (exception) {
        console.log(exception);
        throw new Error('Error while connecting mongo');
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const a = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(a.connection);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;

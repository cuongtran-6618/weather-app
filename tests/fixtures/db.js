const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/weather`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
});

module.exports = {
    mongoose,
};

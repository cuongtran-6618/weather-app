const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: {
        type: String,
        require: [ true, `Please add city name` ],
        unique: false,
        trim: true,
        maxlength: [ 100, `The city name can't be more than 100 characters` ]
    },
    date: {
        type: String,
        require: [ true, `Please add date` ],
        unique: false,
        trim: true,
        maxlength: [ 100, `The date can't be more than 100 characters` ]
    },
    icon: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 100, `The icon can't be more than 100 characters` ]
    },
    temperature: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 5, `The temperature can't be more than 5 characters` ]
    },
    description: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 150, `The description can't be more than 150 characters` ]
    },
    feels_like: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 5, `The feels_like can't be more than 5 characters` ]
    },
    max_temperature: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 5, `The max temperature can't be more than 5 characters` ]
    },
    min_temperature: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 5, `The min temperature can't be more than 5 characters` ]
    },
    visibility: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxlength: [ 5, `The feels_like can't be more than 5 characters` ]
    }
});

WeatherSchema.index({ "city": 1, "date": 1 }, { "unique": true });

module.exports = mongoose.model(`Weather`, WeatherSchema);
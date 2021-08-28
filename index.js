const appBootstrap = require('./server');
const connectDB = require('./boostrap/database');

const boostrap = async () => {
    await connectDB();
    const app = await appBootstrap();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log('server started successfullly already');
    });
};

boostrap();

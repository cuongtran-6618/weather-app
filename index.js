const appBootstrap = require('./server');
const boostrap = async () => {
    console.log('boostrap');
    const app = await appBootstrap();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log('server started successfullly already');
    });
};

boostrap();

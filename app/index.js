const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 80,
        // host: '::'
    });

    await server.register([
        require('@hapi/vision'),
        require('@hapi/inert')
    ]);

    require('./helpers/static')(server)
    require('./helpers/views')(server)

    require('./routes/index')(server)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
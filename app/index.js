const Hapi = require('@hapi/hapi');

const init = async () => {
    await require('./helpers/init')()

    const server = Hapi.server({port: 80});

    await server.register([
        require('@hapi/vision'),
        require('@hapi/inert')
    ]); 

    require('./routes/static')(server)
    require('./routes/input')(server)
    require('./routes/views')(server)

    require('./routes/index/index')(server)
    require('./routes/plot/plot')(server)

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
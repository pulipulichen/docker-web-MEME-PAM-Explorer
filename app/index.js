const Hapi = require('@hapi/hapi');

const fs = require('fs');

const init = async () => {

    const server = Hapi.server({
        port: 80,
        host: '::'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world! ' + fs.readFileSync('/opt/input/demo.txt', 'utf8');
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
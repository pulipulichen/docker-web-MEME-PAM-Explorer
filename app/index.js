const Hapi = require('@hapi/hapi');

const fs = require('fs');

const processODSFiles = require("./processODSFiles")

// Define your Book model
// const Book = sequelize.define('Book', {
//     title: Sequelize.STRING,
//     author: Sequelize.STRING,
//     publicationYear: Sequelize.INTEGER,
//     // Add more fields as needed
//   });

// // Synchronize the model with the database (create the table if it doesn't exist)
// sequelize.sync()
//   .then(() => {
//     console.log('Database & table created!');
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });

const init = async () => {

    const server = Hapi.server({
        port: 80,
        host: '::'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            // const bookData = {
            //     title: "The Great Gatsby",
            //     author: "F. Scott Fitzgerald",
            //     publicationYear: 1925,
            //     // Add more fields as needed
            //   };
            // await Book.create(bookData)

            await processODSFiles()

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
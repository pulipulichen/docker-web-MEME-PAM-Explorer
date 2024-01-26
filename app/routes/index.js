const processODSFiles = require("./../helpers/processODSFiles")

module.exports = function (server) {
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

        // await processODSFiles()

        // return 'Hello, world! ' + fs.readFileSync('/opt/input/demo.txt', 'utf8');
        // return 'Hello, world! '

        return h.view('index', {
            title: 'My Website',
            // header: '<h1>Welcome to My Website</h1>', 
            // content: '<h2>Hello, {{name}}!</h2>',
            // footer: '<p>&copy; 2024 My Website</p>',
            name: 'John'
        })
    }
});
}
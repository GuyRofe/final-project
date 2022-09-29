const http = require('http');

require("dotenv").config();
const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT;
const server = http.createServer(app);

mongoose.connect(process.env.DB_CONNECTION_STRING, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
}).then(() => {
    server.listen(+port);

    console.log(`Server is listening on port "${port}"`);
}).catch((e) => {
    console.log(`Failed to set up the DB with an error: ${e}`);
});

const express = require('express');
const app = express();
const config = require('config');
require('./startup/db')();
require('./startup/validate')();
require('./startup/routes')(express,app);

if(!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR : jwtPrivateKey is not defined. Exiting...');
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
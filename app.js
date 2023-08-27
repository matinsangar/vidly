const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');

//routers
require('./startup/log')();  //First
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
if (process.env.NODE_ENV === 'production') {
    require('./startup/prod')(app);
}

const startUpDebugger = require('debug')("app:startup");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
if (process.env.NODE_ENV === "development") {
    console.log("Morgan is active....");
    app.use(morgan('tiny'));
    startUpDebugger("HELLO now we are in startUp debugger in development mode");
}

//middlewares
const auth_middleware = require('./middlewares/auth');
app.use(auth_middleware);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = server;
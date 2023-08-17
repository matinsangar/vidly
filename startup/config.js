const config = require('config');

function clean_config() {
    console.log("The app name is: ", config.get('name'));
    console.log("The Mail Server is: ", config.get('mail'));

    const result = config.get("jwtPrivateKey");
    if (!result) {
        throw new Error("jwtPrivateKey is not defined");
    }
};

module.exports = clean_config;
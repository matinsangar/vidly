const bcrypt = require('bcrypt');

async function run() {
    const result = await bcrypt.genSalt(10);
    console.log(result);
}

run();
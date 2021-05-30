const { readFile } = require('fs');
const promisify = require('./promisify');

module.exports = promisify(readFile);

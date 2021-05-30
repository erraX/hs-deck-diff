const promisify = require('./promisify');
const { parseString } = require('xml2js');

module.exports = promisify(parseString);

const bunyan = require('bunyan')
const log = bunyan.createLogger({name: "site-prerender"})

module.exports = log

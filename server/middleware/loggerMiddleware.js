const logger = require('../logger');

const requestLogger = (req, res, next) => {

    let { ip, method, url, body, params } = req;

    if (ip == '::1') {
        ip = 'localhost'
    }
    else if (ip.startsWith('::ffff')) {
        ip = ip.split('::ffff:')[1]
    }

    logger.info(`${method} - ${url} from ${ip}, body: ${JSON.stringify(body)}, params: ${JSON.stringify(params)}`)
    next();
};

module.exports = requestLogger;
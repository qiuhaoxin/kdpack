// import portfinder from 'portfinder';
const portfinder = require('portfinder');
//export default
module.exports = async port => {
    if (port) return port;
    if (process.env.PORT) {
        return parseInt(process.env.PORT, 10);
    }
    portfinder.basePort = process.env.BASE_PORT || 8100;
    portfinder.highestPort = 9000;

    return portfinder.getPortPromise();
}



const {URL} = require('url');
const fs = require('fs');

function errorHandler(req, res) {
    res.writeHead(404);
    res.write(`Bad request`);
    res.end();
}

function loadPage(req, res) {
    const pathName = new URL(req.url, `http://${req.headers.host}`).pathname;
    res.writeHead(200);
    // res.status(200);
     fs.createReadStream(process.cwd() + '/Front' + pathName)
        .on('error', error => errorHandler(req, res))
        .pipe(res);
}

module.exports = {
    loadPage,
    errorHandler
}

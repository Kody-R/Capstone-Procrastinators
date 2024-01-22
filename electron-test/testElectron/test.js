const http = require('http')

const options = {
    hostname: 'localhost',
    port: 8000,
    method: 'GET',
};

const req = http.request(options, (res => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log("Response from server: ", data);
    });
}));

req.end();
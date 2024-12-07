const http = require('http');
const fs = require('fs');
const routes = require('./routes');

// 1. Basic server with response
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method, req.headers);

//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>Hello from my NodeJS Server!</h1></body>');
//     res.write('</html>');
//     res.end();
// });

// server.listen(3000);

// 2. Basic server with response depending on URL

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('<html>');
//         res.write('<head><title>Enter a Message</title></head>');
//         res.write('<body><form><input type="text" name="message"><button>Submit</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     }

//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>Hello from my NodeJS Server!</h1></body>');
//     res.write('</html>');
//     res.end();
// });

// server.listen(3000);

// 3. URL detection, redirection and file writing

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;

//     if (url === '/') {
//         res.write('<html>');
//         res.write('<head><title>Enter a Message</title></head>');
//         res.write('<body><form><input type="text" name="message"><button>Submit</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     }

//     if (url === '/method' && method === 'POST') {
//         fs.writeFileSync('message.txt', 'DUMMY');
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         return res.end();
//     }

//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>Hello from my NodeJS Server!</h1></body>');
//     res.write('</html>');
//     res.end();
// });

// server.listen(3000);


// 4. Parsing the request

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;

//     if (url === '/') {
//         res.write('<html>');
//         res.write('<head><title>Enter a Message</title></head>');
//         res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Submit</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     }

//     if (url === '/message' && method === 'POST') {
//         const body = [];
//         req.on('data', (chunk) => {
//             console.log(chunk);
//             body.push(chunk);
//         });

//         return req.on('end', () => {
//             const parsedBody = Buffer.concat(body).toString();
//             const message = parsedBody.split('=')[1];
//             fs.writeFile('message.txt', message, () => {
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 return res.end();
//             });
//         })
//     }

//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>Hello from my NodeJS Server!</h1></body>');
//     res.write('</html>');
//     res.end();
// });

// server.listen(3000);

const server = http.createServer(routes);

server.listen(3000);
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');


    if (url === '/') {
        res.write(`
            <html>
                <body>
                    <h1>Greetings from my Assignment Page</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="Username">
                        <button>Submit</button>
                    </form>
                </body>
            </html>
        
        `)
        res.end();
    }

    if (url === '/users') {
        res.write(`
            <html>
                <body>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                </body>
            </html>
        `);
        res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        
        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split('=')[1];
            console.log(name);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });


    } 
});

server.listen(3000);
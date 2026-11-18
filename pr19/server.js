const http = require('http');
const url = require('url');

let users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
    { id: 2, name: 'Петр Петров', email: 'petr@example.com' },
    { id: 3, name: 'Мария Сидорова', email: 'maria@example.com' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    console.log(`${new Date().toISOString()} - ${method} ${pathname}`);

    if (pathname === '/' && method === 'GET') {
        handleHome(req, res);
    } else if (pathname === '/api/users' && method === 'GET') {
        handleGetUsers(req, res);
    } else if (pathname === '/api/users' && method === 'POST') {
        handleCreateUser(req, res);
    } else if (pathname.startsWith('/api/users/') && method === 'GET') {
        handleGetUser(req, res, pathname);
    } else if (pathname.startsWith('/api/users/') && method === 'PUT') {
        handleUpdateUser(req, res, pathname);
    } else if (pathname.startsWith('/api/users/') && method === 'DELETE') {
        handleDeleteUser(req, res, pathname);
    } else if (pathname === '/api/status' && method === 'GET') {
        handleStatus(req, res);
    } else {
        handleNotFound(req, res);
    }
});

function handleHome(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Добро пожаловать на сервер!',
        endpoints: {
            '/api/users': 'GET, POST - работа с пользователями',
            '/api/users/:id': 'GET, PUT, DELETE - работа с конкретным пользователем',
            '/api/status': 'GET - информация о сервере'
        }
    }));
}

function handleGetUsers(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}

function handleGetUser(req, res, pathname) {
    const id = parseInt(pathname.split('/').pop());
    const user = users.find(u => u.id === id);
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Пользователь не найден' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
}

function handleCreateUser(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (!data.name || !data.email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Поля name и email обязательны' }));
            }
            const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                name: data.name,
                email: data.email
            };
            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Неверный JSON' }));
        }
    });
}

function handleUpdateUser(req, res, pathname) {
    const id = parseInt(pathname.split('/').pop());
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Пользователь не найден' }));
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (data.name) users[idx].name = data.name;
            if (data.email) users[idx].email = data.email;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users[idx]));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Неверный JSON' }));
        }
    });
}

function handleDeleteUser(req, res, pathname) {
    const id = parseInt(pathname.split('/').pop());
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Пользователь не найден' }));
    }
    const deleted = users.splice(idx, 1)[0];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(deleted));
}

function handleStatus(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    }));
}

function handleNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Маршрут не найден', path: req.url }));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

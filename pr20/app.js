const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});

const requestCounts = {};
app.use((req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const maxRequests = 100;

    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 1, startTime: now };
    } else {
        if (now - requestCounts[ip].startTime > windowMs) {
            requestCounts[ip] = { count: 1, startTime: now };
        } else {
            requestCounts[ip].count++;
        }
    }

    if (requestCounts[ip].count > maxRequests) {
        return res.status(429).json({
            error: 'Слишком много запросов',
            message: 'Пожалуйста, попробуйте позже'
        });
    }
    next();
});

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в Express.js приложение!',
        endpoints: {
            '/api/users': 'Работа с пользователями',
            '/api/products': 'Работа с товарами'
        }
    });
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.originalUrl
    });
});

app.use((err, req, res, next) => {
    console.error('Ошибка сервера', err.stack);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
    });
});

app.listen(PORT, () => {
    console.log(`Express сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
});

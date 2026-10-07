# Ответы на вопросы ПР14

## 1. Fetch API vs XMLHttpRequest

Fetch — на промисах, чище, современнее, поддерживает async/await, Stream API. XHR — старый, callback-стиль, но поддерживает прогресс загрузки и работает в старых браузерах.

## 2. Обработка ошибок

HTTP 404 не reject, потому что fetch реджектит только при сетевых ошибках. Нужно проверять `response.ok` вручную.

## 3. HTTP-методы

GET (получить), POST (создать), PUT (заменить), PATCH (частично обновить), DELETE (удалить), HEAD (только заголовки), OPTIONS (CORS preflight).

## 4. Заголовки

Запрос: `Content-Type`, `Authorization`, `Accept`, `Cache-Control`, `X-Custom-Header`. Ответ: `Content-Type`, `Content-Length`, `Date`, `Set-Cookie`.

## 5. PUT vs PATCH

PUT — полная замена ресурса. PATCH — частичное обновление. PUT идемпотентен и требует всех полей, PATCH — только изменённых.

## 6. Авторизация

- **Basic Auth**: `Authorization: Basic base64(user:pass)`
- **Bearer Token**: `Authorization: Bearer <token>`
- **OAuth2**: получение токена через отдельный endpoint, затем Bearer.

## 7. Отмена запросов

`AbortController` + `signal`. Используется для таймаутов, отмены устаревших запросов при новом вводе (поиск).

## 8. Форматы данных

- `response.json()` — JSON
- `response.text()` — текст
- `response.blob()` — бинарные данные (изображения, файлы)
- `response.arrayBuffer()` — низкоуровневый буфер
- `response.formData()` — FormData

## 9. Оптимизация

Параллельные запросы (Promise.all), кэширование (Map + TTL), debounce при поиске, AbortController для отмены.

## 10. Best practices

Всегда проверять `response.ok`, обрабатывать ошибки, использовать таймауты, кэшировать GET-запросы, использовать HTTPS, правильные заголовки, не хранить секреты в коде.
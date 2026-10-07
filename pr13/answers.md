# Ответы на вопросы ПР13

## 1. then/catch vs async/await

`then/catch` — цепочки промисов, явный стиль. `async/await` — синхронный вид кода, читаемее, удобнее для сложной логики. Использую `async/await` для последовательных операций, `then/catch` — для простых случаев.

## 2. Promise.all

Ждёт выполнения всех промисов. Если один reject — весь Promise.all отклоняется с этой ошибкой, остальные игнорируются.

## 3. all vs race vs allSettled

- `Promise.all` — ждёт все, reject при первой ошибке.
- `Promise.race` — возвращает первый завершённый (resolve или reject).
- `Promise.allSettled` — ждёт все, возвращает статусы fulfilled/rejected.

Практика: all — загрузка данных; race — таймауты; allSettled — сбор статистики.

## 4. Retry с backoff

Повторные попытки с увеличивающейся задержкой (1с, 2с, 4с...). Реализуется через цикл for с await и `setTimeout` внутри промиса.

## 5. Race condition

Ситуация, когда несколько операций конкурируют за ресурс, результат непредсказуем. Решения: блокировки, очереди, отмена устаревших запросов через AbortController.

## 6. Кэширование

Map с ключом URL и TTL (time to live). Стратегии: in-memory, localStorage, service worker, HTTP-кэш.

## 7. Оптимизация

Параллельные запросы (Promise.all), кэширование, debounce, отмена ненужных запросов.

## 8. Обработка ошибок

Всегда добавлять `.catch` или `try/catch`. Не забывать `return` в цепочках. Использовать `Promise.allSettled`, если ошибки допустимы.

## 9. Преимущества async/await

Читаемость, отладка (стек как в синхронном коде), удобная обработка ошибок, отсутствие «ада колбэков».

## 10. Отладка

Chrome DevTools → Sources → breakpoints, Network для запросов, console.log, `debugger`, React DevTools, асинхронные стек-трейсы.
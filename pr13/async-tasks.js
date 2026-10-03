function createBasicPromise(shouldResolve) {
if (shouldResolve === undefined) shouldResolve = true;
return new Promise(function(resolve, reject) {
setTimeout(function() {
if (shouldResolve) resolve('Успех!');
else reject(new Error('Ошибка!'));
}, 1000);
});
}
function handleBasicPromise() {
var output = document.getElementById('promise-output');
if (output) output.textContent = 'Загрузка...';
createBasicPromise(true)
.then(function(r) { if (output) output.textContent = r; })
.catch(function(e) { if (output) output.textContent = e.message; });
}
function createPromiseChain() {
var output = document.getElementById('promise-output');
if (output) output.textContent = 'Цепочка...';
createBasicPromise(true)
.then(function(r) { return new Promise(function(res) { setTimeout(function() { res(r + ' -> Шаг 2'); }, 500); }); })
.then(function(r) { return new Promise(function(res) { setTimeout(function() { res(r + ' -> Шаг 3'); }, 500); }); })
.then(function(r) { if (output) output.textContent = r; })
.catch(function(e) { if (output) output.textContent = e.message; });
}
function handlePromiseError() {
var output = document.getElementById('promise-output');
if (output) output.textContent = 'Загрузка...';
createBasicPromise(false)
.then(function(r) { if (output) output.textContent = r; })
.catch(function(e) { if (output) output.textContent = 'Ошибка: ' + e.message; });
}
function setupPromiseEvents() {
var b1 = document.getElementById('basic-promise');
var b2 = document.getElementById('promise-chain');
var b3 = document.getElementById('promise-error');
if (b1) b1.addEventListener('click', handleBasicPromise);
if (b2) b2.addEventListener('click', createPromiseChain);
if (b3) b3.addEventListener('click', handlePromiseError);
}
function basicAsyncAwait() {
var output = document.getElementById('async-output');
if (output) output.textContent = 'Загрузка...';
return createBasicPromise(true).then(function(r) { if (output) output.textContent = r; }).catch(function(e) { if (output) output.textContent = e.message; });
}
function handleAsyncError() {
var output = document.getElementById('async-output');
if (output) output.textContent = 'Загрузка...';
return createBasicPromise(false).catch(function(e) { if (output) output.textContent = 'Ошибка: ' + e.message; });
}
function parallelAsyncExecution() {
var output = document.getElementById('async-output');
if (output) output.textContent = 'Параллельно...';
var start = Date.now();
return Promise.all([createBasicPromise(true), createBasicPromise(true), createBasicPromise(true)])
.then(function(results) { if (output) output.textContent = 'Результаты: ' + results.join(', ') + ' за ' + (Date.now() - start) + 'мс'; })
.catch(function(e) { if (output) output.textContent = e.message; });
}
function setupAsyncEvents() {
var b1 = document.getElementById('basic-async');
var b2 = document.getElementById('async-error');
var b3 = document.getElementById('async-parallel');
if (b1) b1.addEventListener('click', basicAsyncAwait);
if (b2) b2.addEventListener('click', handleAsyncError);
if (b3) b3.addEventListener('click', parallelAsyncExecution);
}
function fetchUsers() {
var output = document.getElementById('api-output');
var data = document.getElementById('api-data');
if (output) output.textContent = 'Загрузка...';
return fetch('https://jsonplaceholder.typicode.com/users')
.then(function(res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
.then(function(users) {
if (output) output.textContent = 'Загружено: ' + users.length;
if (data) data.innerHTML = users.map(function(u) { return '<div class="user-card"><h4>' + u.name + '</h4><p>' + u.email + '</p></div>'; }).join('');
})
.catch(function(e) { if (output) output.textContent = 'Ошибка: ' + e.message; });
}
function createPost() {
var output = document.getElementById('api-output');
if (output) output.textContent = 'Отправка...';
return fetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 'Заголовок', body: 'Текст', userId: 1 })
})
.then(function(res) { return res.json(); })
.then(function(data) { if (output) output.textContent = 'Создан пост ID: ' + data.id; })
.catch(function(e) { if (output) output.textContent = 'Ошибка: ' + e.message; });
}
function testApiError() {
var output = document.getElementById('api-output');
if (output) output.textContent = 'Тест...';
return fetch('https://jsonplaceholder.typicode.com/nonexistent')
.then(function(res) { if (!res.ok) throw new Error('HTTP ' + res.status); })
.catch(function(e) { if (output) output.textContent = 'Поймана: ' + e.message; });
}
function setupApiEvents() {
var b1 = document.getElementById('fetch-users');
var b2 = document.getElementById('fetch-post');
var b3 = document.getElementById('fetch-error');
if (b1) b1.addEventListener('click', fetchUsers);
if (b2) b2.addEventListener('click', createPost);
if (b3) b3.addEventListener('click', testApiError);
}
var intervalId;
function startAsyncInterval() {
var output = document.getElementById('interval-output');
if (intervalId) return;
var counter = 0;
intervalId = setInterval(function() { counter++; if (output) output.textContent = 'Счётчик: ' + counter; }, 1000);
}
function stopAsyncInterval() {
clearInterval(intervalId);
intervalId = null;
var output = document.getElementById('interval-output');
if (output) output.textContent = 'Остановлено';
}
function delayWithPromise(ms) {
return new Promise(function(resolve) { setTimeout(resolve, ms); });
}
function testDelay() {
var output = document.getElementById('timer-output');
if (!output) return;
return delayWithPromise(500)
.then(function() { output.textContent = 'Шаг 1'; return delayWithPromise(500); })
.then(function() { output.textContent = 'Шаг 2'; return delayWithPromise(500); })
.then(function() { output.textContent = 'Шаг 3'; return delayWithPromise(500); })
.then(function() { output.textContent = 'Готово!'; });
}
function setupTimerEvents() {
var b1 = document.getElementById('start-interval');
var b2 = document.getElementById('stop-interval');
var b3 = document.getElementById('delay-promise');
if (b1) b1.addEventListener('click', startAsyncInterval);
if (b2) b2.addEventListener('click', stopAsyncInterval);
if (b3) b3.addEventListener('click', testDelay);
}
function asyncTryCatch() {
var output = document.getElementById('error-output');
if (!output) return;
createBasicPromise(false).catch(function(e) { output.textContent = 'Внутренняя: ' + e.message + '\n'; })
.then(function() { return createBasicPromise(true); })
.then(function() { output.textContent += 'Внешний блок'; })
.catch(function(e) { output.textContent += 'Внешняя: ' + e.message; });
}
function handleMultipleErrors() {
var output = document.getElementById('error-output');
if (!output) return;
Promise.allSettled([createBasicPromise(true), createBasicPromise(false), createBasicPromise(true)])
.then(function(results) {
var ok = results.filter(function(r) { return r.status === 'fulfilled'; }).length;
var fail = results.filter(function(r) { return r.status === 'rejected'; }).length;
output.textContent = 'Успешных: ' + ok + ', Ошибок: ' + fail;
});
}
function retryWithBackoff(operation, maxRetries) {
if (maxRetries === undefined) maxRetries = 3;
var attempt = 0;
function attemptRun() {
return operation().catch(function(e) {
attempt++;
if (attempt >= maxRetries) throw e;
return delayWithPromise(1000 * Math.pow(2, attempt - 1)).then(attemptRun);
});
}
return attemptRun();
}
function setupErrorEvents() {
var b1 = document.getElementById('try-catch');
var b2 = document.getElementById('multiple-errors');
var b3 = document.getElementById('retry-pattern');
if (b1) b1.addEventListener('click', asyncTryCatch);
if (b2) b2.addEventListener('click', handleMultipleErrors);
if (b3) b3.addEventListener('click', function() {
var output = document.getElementById('error-output');
retryWithBackoff(function() { return createBasicPromise(true); }, 3)
.then(function(r) { if (output) output.textContent = 'Успех: ' + r; })
.catch(function(e) { if (output) output.textContent = 'Не удалось: ' + e.message; });
});
}
function demonstratePromiseAll() {
var output = document.getElementById('parallel-output');
if (output) output.textContent = 'Promise.all...';
var start = Date.now();
Promise.all([createBasicPromise(true), createBasicPromise(true), createBasicPromise(true)])
.then(function(results) { if (output) output.textContent = 'Promise.all: ' + results.join(', ') + ' за ' + (Date.now() - start) + 'мс'; });
}
function demonstratePromiseRace() {
var output = document.getElementById('parallel-output');
if (output) output.textContent = 'Promise.race...';
Promise.race([
delayWithPromise(300).then(function() { return 'Быстрый'; }),
delayWithPromise(600).then(function() { return 'Медленный'; })
]).then(function(result) { if (output) output.textContent = 'Promise.race: ' + result; });
}
function demonstratePromiseAllSettled() {
var output = document.getElementById('parallel-output');
if (output) output.textContent = 'allSettled...';
Promise.allSettled([createBasicPromise(true), createBasicPromise(false), createBasicPromise(true)])
.then(function(results) { if (output) output.textContent = 'allSettled: ' + results.map(function(r) { return r.status; }).join(', '); });
}
function setupParallelEvents() {
var b1 = document.getElementById('promise-all');
var b2 = document.getElementById('promise-race');
var b3 = document.getElementById('promise-allSettled');
if (b1) b1.addEventListener('click', demonstratePromiseAll);
if (b2) b2.addEventListener('click', demonstratePromiseRace);
if (b3) b3.addEventListener('click', demonstratePromiseAllSettled);
}
function sequentialApiRequests() {
var output = document.getElementById('scenario-output');
if (!output) return;
output.textContent = 'Запрос 1...';
var user;
fetch('https://jsonplaceholder.typicode.com/users/1').then(function(r) { return r.json(); })
.then(function(u) {
user = u;
output.textContent += '\nПользователь: ' + u.name;
output.textContent += '\nЗапрос 2...';
return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + u.id);
})
.then(function(r) { return r.json(); })
.then(function(posts) {
output.textContent += '\nПостов: ' + posts.length;
output.textContent += '\nЗапрос 3...';
return fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
})
.then(function(r) { return r.json(); })
.then(function(comments) { output.textContent += '\nКомментариев: ' + comments.length; })
.catch(function(e) { output.textContent += '\nОшибка: ' + e.message; });
}
function simulateFileUpload() {
var fill = document.getElementById('progress-fill');
var output = document.getElementById('scenario-output');
if (!fill) return;
if (output) output.textContent = 'Загрузка...';
var step = 0;
var interval = setInterval(function() {
step += 10;
fill.style.width = step + '%';
if (output) output.textContent = 'Прогресс: ' + step + '%';
if (step >= 100) { clearInterval(interval); if (output) output.textContent = 'Загрузка завершена!'; }
}, 100);
}
function createRequestCache() {
var cache = new Map();
return function cachedRequest(url) {
if (cache.has(url)) return Promise.resolve(cache.get(url));
return fetch(url).then(function(r) { return r.json(); }).then(function(data) {
cache.set(url, data);
return data;
});
};
}
function setupRealScenarioEvents() {
var b1 = document.getElementById('sequential-requests');
var b2 = document.getElementById('upload-simulation');
var b3 = document.getElementById('cache-requests');
if (b1) b1.addEventListener('click', sequentialApiRequests);
if (b2) b2.addEventListener('click', simulateFileUpload);
if (b3) b3.addEventListener('click', function() {
var output = document.getElementById('scenario-output');
var cached = createRequestCache();
var start = Date.now();
cached('https://jsonplaceholder.typicode.com/posts/1').then(function() {
var first = Date.now() - start;
var start2 = Date.now();
cached('https://jsonplaceholder.typicode.com/posts/1').then(function() {
var second = Date.now() - start2;
if (output) output.textContent = 'Первый: ' + first + 'мс, из кэша: ' + second + 'мс';
});
});
});
}
function initializeAsyncOperations() {
setupPromiseEvents();
setupAsyncEvents();
setupApiEvents();
setupTimerEvents();
setupErrorEvents();
setupParallelEvents();
setupRealScenarioEvents();
console.log('Все обработчики инициализированы!');
}
document.addEventListener('DOMContentLoaded', initializeAsyncOperations);

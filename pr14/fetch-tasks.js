var API_BASE_URL = 'https://jsonplaceholder.typicode.com';
function displayOutput(elementId, data, isError) {
if (isError === undefined) isError = false;
var output = document.getElementById(elementId);
if (!output) return;
var timestamp = new Date().toLocaleTimeString();
var content;
if (typeof data === 'object') content = JSON.stringify(data, null, 2);
else if (data instanceof Error) content = 'Ошибка: ' + data.message;
else content = String(data);
output.innerHTML = '[' + timestamp + '] ' + content;
output.className = 'output ' + (isError ? 'error' : 'success');
}
function displayData(elementId, data) {
var container = document.getElementById(elementId);
if (!container) return;
if (Array.isArray(data)) {
container.innerHTML = data.map(function(item) {
return '<div class="user-card"><h4>' + (item.name || item.title || 'Без названия') + '</h4><p>Email: ' + (item.email || 'Нет') + '</p></div>';
}).join('');
} else if (typeof data === 'object') {
container.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
} else {
container.innerHTML = '<p>' + String(data) + '</p>';
}
}
function setLoadingState(buttonId, isLoading) {
var button = document.getElementById(buttonId);
if (!button) return;
if (isLoading) {
button.disabled = true;
button.dataset.originalText = button.textContent;
button.innerHTML = '<span class="spinner"></span> Загрузка...';
} else {
button.disabled = false;
button.innerHTML = button.dataset.originalText || button.textContent;
}
}
function fetchGetRequest() {
setLoadingState('fetch-get', true);
fetch(API_BASE_URL + '/posts/1')
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('get-output', data); })
.catch(function(err) { displayOutput('get-output', err, true); })
.then(function() { setLoadingState('fetch-get', false); });
}
function fetchJsonData() {
setLoadingState('fetch-json', true);
fetch(API_BASE_URL + '/users')
.then(function(res) { return res.json(); })
.then(function(data) {
displayOutput('get-output', 'Загружено: ' + data.length);
displayData('get-data', data);
})
.catch(function(err) { displayOutput('get-output', err, true); })
.then(function() { setLoadingState('fetch-json', false); });
}
function fetchWithError() {
setLoadingState('fetch-error', true);
fetch('https://nonexistent.example/api')
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('get-output', data); })
.catch(function(err) { displayOutput('get-output', err, true); })
.then(function() { setLoadingState('fetch-error', false); });
}
function setupGetRequests() {
['fetch-get', 'fetch-json', 'fetch-error'].forEach(function(id) {
var btn = document.getElementById(id);
if (btn) btn.setAttribute('data-original-text', btn.textContent);
});
var b1 = document.getElementById('fetch-get');
var b2 = document.getElementById('fetch-json');
var b3 = document.getElementById('fetch-error');
if (b1) b1.addEventListener('click', fetchGetRequest);
if (b2) b2.addEventListener('click', fetchJsonData);
if (b3) b3.addEventListener('click', fetchWithError);
}
function fetchPostRequest() {
fetch(API_BASE_URL + '/posts', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 'Заголовок', body: 'Текст', userId: 1 })
})
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('crud-output', data); })
.catch(function(err) { displayOutput('crud-output', err, true); });
}
function fetchPutRequest() {
fetch(API_BASE_URL + '/posts/1', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ id: 1, title: 'Обновлено', body: 'Текст', userId: 1 })
})
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('crud-output', data); })
.catch(function(err) { displayOutput('crud-output', err, true); });
}
function fetchPatchRequest() {
fetch(API_BASE_URL + '/posts/1', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: 'Только заголовок' })
})
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('crud-output', data); })
.catch(function(err) { displayOutput('crud-output', err, true); });
}
function fetchDeleteRequest() {
fetch(API_BASE_URL + '/posts/1', { method: 'DELETE' })
.then(function(res) {
if (res.ok) displayOutput('crud-output', 'Удалено, статус: ' + res.status);
else displayOutput('crud-output', 'Ошибка: ' + res.status, true);
})
.catch(function(err) { displayOutput('crud-output', err, true); });
}
function setupCrudRequests() {
var b1 = document.getElementById('fetch-post');
var b2 = document.getElementById('fetch-put');
var b3 = document.getElementById('fetch-patch');
var b4 = document.getElementById('fetch-delete');
if (b1) b1.addEventListener('click', fetchPostRequest);
if (b2) b2.addEventListener('click', fetchPutRequest);
if (b3) b3.addEventListener('click', fetchPatchRequest);
if (b4) b4.addEventListener('click', fetchDeleteRequest);
}
function fetchWithHeaders() {
fetch(API_BASE_URL + '/posts', { headers: { 'X-Custom-Header': 'test', 'Authorization': 'Bearer token123' } })
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('headers-output', 'Кастомные заголовки, ответ: ' + data.length); })
.catch(function(err) { displayOutput('headers-output', err, true); });
}
function fetchWithAuth() {
var token = btoa('user:password');
fetch(API_BASE_URL + '/posts/1', { headers: { 'Authorization': 'Basic ' + token } })
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('headers-output', 'Basic Auth: ' + data.id); })
.catch(function(err) { displayOutput('headers-output', err, true); });
}
function fetchWithParams() {
var url = new URL(API_BASE_URL + '/posts');
url.searchParams.append('_limit', '5');
url.searchParams.append('_sort', 'id');
url.searchParams.append('_order', 'desc');
fetch(url.toString())
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('headers-output', 'Параметры: ' + url.search + ', получено: ' + data.length); })
.catch(function(err) { displayOutput('headers-output', err, true); });
}
function fetchWithTimeout() {
var controller = new AbortController();
var timeoutId = setTimeout(function() { controller.abort(); }, 3000);
fetch(API_BASE_URL + '/posts', { signal: controller.signal })
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('headers-output', 'Успешно: ' + data.length); })
.catch(function(err) {
if (err.name === 'AbortError') displayOutput('headers-output', 'Отменён по таймауту', true);
else displayOutput('headers-output', err, true);
})
.then(function() { clearTimeout(timeoutId); });
}
function setupHeadersAndParams() {
var b1 = document.getElementById('fetch-headers');
var b2 = document.getElementById('fetch-auth');
var b3 = document.getElementById('fetch-params');
var b4 = document.getElementById('fetch-timeout');
if (b1) b1.addEventListener('click', fetchWithHeaders);
if (b2) b2.addEventListener('click', fetchWithAuth);
if (b3) b3.addEventListener('click', fetchWithParams);
if (b4) b4.addEventListener('click', fetchWithTimeout);
}
function fetchAndCheckStatus() {
fetch(API_BASE_URL + '/posts/1')
.then(function(res) {
if (!res.ok) throw new Error('HTTP ' + res.status);
displayOutput('response-output', 'Статус: ' + res.status + ' ' + res.statusText);
})
.catch(function(err) { displayOutput('response-output', err, true); });
}
function fetchAndReadHeaders() {
fetch(API_BASE_URL + '/posts/1')
.then(function(res) {
var headers = [];
res.headers.forEach(function(value, key) { headers.push(key + ': ' + value); });
displayOutput('response-output', 'Заголовки:\n' + headers.join('\n'));
})
.catch(function(err) { displayOutput('response-output', err, true); });
}
function fetchBlobData() {
fetch('https://picsum.photos/200/300')
.then(function(res) { return res.blob(); })
.then(function(blob) {
var data = document.getElementById('response-data');
if (data) {
data.innerHTML = '';
var img = document.createElement('img');
img.src = URL.createObjectURL(blob);
img.style.maxWidth = '200px';
data.appendChild(img);
}
displayOutput('response-output', 'Blob: ' + blob.size + ' байт');
})
.catch(function(err) { displayOutput('response-output', err, true); });
}
function fetchWithFormData() {
var formData = new FormData();
formData.append('title', 'Заголовок');
formData.append('body', 'Текст');
fetch(API_BASE_URL + '/posts', { method: 'POST', body: formData })
.then(function(res) { return res.json(); })
.then(function(data) { displayOutput('response-output', 'FormData отправлена: ' + data.id); })
.catch(function(err) { displayOutput('response-output', err, true); });
}
function setupResponseHandling() {
var b1 = document.getElementById('fetch-status');
var b2 = document.getElementById('fetch-headers-response');
var b3 = document.getElementById('fetch-blob');
var b4 = document.getElementById('fetch-formdata');
if (b1) b1.addEventListener('click', fetchAndCheckStatus);
if (b2) b2.addEventListener('click', fetchAndReadHeaders);
if (b3) b3.addEventListener('click', fetchBlobData);
if (b4) b4.addEventListener('click', fetchWithFormData);
}
function fetchNetworkError() {
fetch('https://nonexistent-domain-xyz.example/api')
.catch(function(err) { displayOutput('error-output', 'Сетевая: ' + err.message, true); });
}
function fetchHttpError() {
fetch(API_BASE_URL + '/nonexistent-path-12345')
.then(function(res) { if (!res.ok) throw new Error('HTTP ' + res.status); })
.catch(function(err) { displayOutput('error-output', 'HTTP: ' + err.message, true); });
}
function fetchWithAbort() {
var controller = new AbortController();
setTimeout(function() { controller.abort(); }, 100);
fetch(API_BASE_URL + '/posts', { signal: controller.signal })
.catch(function(err) {
if (err.name === 'AbortError') displayOutput('error-output', 'Отменён вручную', true);
else displayOutput('error-output', err, true);
});
}
function fetchWithRetry(url, options, retries) {
if (options === undefined) options = {};
if (retries === undefined) retries = 3;
function attempt(i) {
return fetch(url, options)
.then(function(res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
.catch(function(err) {
if (i >= retries - 1) throw err;
return new Promise(function(r) { setTimeout(r, Math.pow(2, i) * 500); }).then(function() { return attempt(i + 1); });
});
}
return attempt(0);
}
function setupErrorHandling() {
var b1 = document.getElementById('fetch-network-error');
var b2 = document.getElementById('fetch-http-error');
var b3 = document.getElementById('fetch-abort');
var b4 = document.getElementById('fetch-retry');
if (b1) b1.addEventListener('click', fetchNetworkError);
if (b2) b2.addEventListener('click', fetchHttpError);
if (b3) b3.addEventListener('click', fetchWithAbort);
if (b4) b4.addEventListener('click', function() {
fetchWithRetry(API_BASE_URL + '/posts/1')
.then(function(data) { displayOutput('error-output', 'Retry OK: ' + data.id); })
.catch(function(err) { displayOutput('error-output', 'Все попытки: ' + err.message, true); });
});
}
function fetchWithPromiseAll() {
var start = Date.now();
Promise.all([
fetch(API_BASE_URL + '/posts/1').then(function(r) { return r.json(); }),
fetch(API_BASE_URL + '/users/1').then(function(r) { return r.json(); }),
fetch(API_BASE_URL + '/comments/1').then(function(r) { return r.json(); })
])
.then(function(results) { displayOutput('parallel-output', 'Promise.all за ' + (Date.now() - start) + 'мс: ' + results.length + ' ответов'); })
.catch(function(err) { displayOutput('parallel-output', err, true); });
}
function fetchWithPromiseRace() {
Promise.race([
fetch(API_BASE_URL + '/posts/1').then(function(r) { return r.json(); }),
new Promise(function(_, rej) { setTimeout(function() { rej(new Error('Таймаут')); }, 2000); })
])
.then(function(result) { displayOutput('parallel-output', 'Promise.race: ' + result.id); })
.catch(function(err) { displayOutput('parallel-output', err, true); });
}
function fetchSequentialRequests() {
var start = Date.now();
var user;
fetch(API_BASE_URL + '/users/1').then(function(r) { return r.json(); })
.then(function(u) { user = u; return fetch(API_BASE_URL + '/posts?userId=' + u.id); })
.then(function(r) { return r.json(); })
.then(function(posts) { displayOutput('parallel-output', 'Последовательно за ' + (Date.now() - start) + 'мс: ' + user.name + ', постов: ' + posts.length); })
.catch(function(err) { displayOutput('parallel-output', err, true); });
}
function setupParallelRequests() {
var b1 = document.getElementById('fetch-promise-all');
var b2 = document.getElementById('fetch-promise-race');
var b3 = document.getElementById('fetch-sequential');
if (b1) b1.addEventListener('click', fetchWithPromiseAll);
if (b2) b2.addEventListener('click', fetchWithPromiseRace);
if (b3) b3.addEventListener('click', fetchSequentialRequests);
}
function fetchUserWithPosts() {
var user;
fetch(API_BASE_URL + '/users/1').then(function(r) { return r.json(); })
.then(function(u) { user = u; return fetch(API_BASE_URL + '/posts?userId=' + u.id); })
.then(function(r) { return r.json(); })
.then(function(posts) {
var data = document.getElementById('scenario-data');
if (data) data.innerHTML = '<div class="user-card"><h4>' + user.name + '</h4><p>' + user.email + '</p><p>Постов: ' + posts.length + '</p></div>';
displayOutput('scenario-output', 'Пользователь и посты загружены');
})
.catch(function(err) { displayOutput('scenario-output', err, true); });
}
function fetchWithSearch() {
fetch(API_BASE_URL + '/posts?q=qui')
.then(function(r) { return r.json(); })
.then(function(data) { displayOutput('scenario-output', 'Поиск: ' + data.length + ' постов'); })
.catch(function(err) { displayOutput('scenario-output', err, true); });
}
function simulateFileUpload() {
var fill = document.getElementById('progress-fill');
if (!fill) return;
var step = 0;
var interval = setInterval(function() {
step += 10;
fill.style.width = step + '%';
if (step >= 100) { clearInterval(interval); displayOutput('scenario-output', 'Загрузка завершена'); }
}, 100);
}
function createFetchCache() {
var cache = new Map();
return function cachedFetch(url, options) {
if (options === undefined) options = {};
var key = url + JSON.stringify(options);
if (cache.has(key)) return Promise.resolve({ data: cache.get(key), cached: true });
return fetch(url, options).then(function(r) { return r.json(); }).then(function(data) {
cache.set(key, data);
return { data: data, cached: false };
});
};
}
function setupRealScenarios() {
var b1 = document.getElementById('fetch-user-posts');
var b2 = document.getElementById('fetch-search');
var b3 = document.getElementById('fetch-upload');
var b4 = document.getElementById('fetch-cache');
if (b1) b1.addEventListener('click', fetchUserWithPosts);
if (b2) b2.addEventListener('click', fetchWithSearch);
if (b3) b3.addEventListener('click', simulateFileUpload);
if (b4) b4.addEventListener('click', function() {
var cache = createFetchCache();
var start = Date.now();
cache(API_BASE_URL + '/posts/1').then(function() {
var t1 = Date.now() - start;
var start2 = Date.now();
return cache(API_BASE_URL + '/posts/1').then(function() {
var t2 = Date.now() - start2;
displayOutput('scenario-output', 'Первый: ' + t1 + 'мс, из кэша: ' + t2 + 'мс');
});
});
});
}
function initializeFetchAPI() {
setupGetRequests();
setupCrudRequests();
setupHeadersAndParams();
setupResponseHandling();
setupErrorHandling();
setupParallelRequests();
setupRealScenarios();
document.querySelectorAll('button').forEach(function(button) {
button.setAttribute('data-original-text', button.textContent);
});
console.log('Fetch API инициализирован!');
}
document.addEventListener('DOMContentLoaded', initializeFetchAPI);

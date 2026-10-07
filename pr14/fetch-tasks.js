// === FETCH API ===
var API_BASE_URL = "https://jsonplaceholder.typicode.com";

function displayOutput(elementId, data, isError) {
    if (isError === undefined) isError = false;
    var output = document.getElementById(elementId);
    if (!output) return;
    var timestamp = new Date().toLocaleTimeString();
    var content;
    if (typeof data === "object") content = JSON.stringify(data, null, 2);
    else if (data instanceof Error) content = "Ошибка: " + data.message + "\n" + data.stack;
    else content = String(data);
    output.innerHTML = "[" + timestamp + "] " + content;
    output.className = "output " + (isError ? "error" : "success");
}

function displayData(elementId, data) {
    var container = document.getElementById(elementId);
    if (!container) return;
    if (Array.isArray(data)) {
        container.innerHTML = data.map(function (item) {
            return '<div class="user-card">' +
                '<h4>' + (item.name || item.title || "Без названия") + '</h4>' +
                '<p>Email: ' + (item.email || "Нет") + '</p>' +
                '<p>Телефон: ' + (item.phone || "Нет") + '</p>' +
                '<p>' + (item.body || item.description || "") + '</p>' +
            '</div>';
        }).join("");
    } else if (typeof data === "object") {
        container.innerHTML = '<div class="json-view">' + JSON.stringify(data, null, 2) + '</div>';
    } else {
        container.innerHTML = "<p>" + String(data) + "</p>";
    }
}

function setLoadingState(buttonId, isLoading) {
    var button = document.getElementById(buttonId);
    if (!button) return;
    if (isLoading) {
        button.disabled = true;
        button.setAttribute("data-original", button.innerHTML);
        button.innerHTML = '<span class="spinner"></span> Загрузка...';
    } else {
        button.disabled = false;
        button.innerHTML = button.getAttribute("data-original") || button.innerHTML;
    }
}

function buildUrl(baseUrl, params) {
    if (params === undefined) params = {};
    var url = new URL(baseUrl);
    Object.keys(params).forEach(function (key) {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

async function measureExecutionTime(asyncFunction) {
    var startTime = Date.now();
    var result = await asyncFunction();
    var endTime = Date.now();
    return { result: result, executionTime: endTime - startTime };
}

// ЗАДАНИЕ 1: Базовые GET запросы
async function fetchGetRequest() {
    setLoadingState("fetch-get", true);
    try {
        var response = await fetch(API_BASE_URL + "/posts/1");
        if (!response.ok) throw new Error("HTTP " + response.status);
        var data = await response.json();
        displayOutput("get-output", "Запрос выполнен успешно (статус " + response.status + ")");
        displayData("get-data", data);
    } catch (error) {
        displayOutput("get-output", error, true);
    } finally { setLoadingState("fetch-get", false); }
}

async function fetchJsonData() {
    setLoadingState("fetch-json", true);
    try {
        var response = await fetch(API_BASE_URL + "/users");
        var data = await response.json();
        displayOutput("get-output", "Загружено пользователей: " + data.length);
        displayData("get-data", data);
    } catch (error) {
        displayOutput("get-output", error, true);
    } finally { setLoadingState("fetch-json", false); }
}

async function fetchWithError() {
    try {
        var response = await fetch("https://nonexistent-domain-xyz.com/api");
        await response.json();
    } catch (error) {
        displayOutput("get-output",
            "СЕТЕВАЯ ОШИБКА: " + error.message +
            "\n\nОтличие от HTTP-ошибки: HTTP-ошибка (404, 500) не бросает reject, " +
            "а сетевая (нет соединения) — бросает TypeError.", true);
    }
}

function setupGetRequests() {
    var b1 = document.getElementById("fetch-get");
    var b2 = document.getElementById("fetch-json");
    var b3 = document.getElementById("fetch-error");
    if (b1) b1.addEventListener("click", fetchGetRequest);
    if (b2) b2.addEventListener("click", fetchJsonData);
    if (b3) b3.addEventListener("click", fetchWithError);
}

// ЗАДАНИЕ 2: POST, PUT, PATCH, DELETE
async function fetchPostRequest() {
    try {
        var response = await fetch(API_BASE_URL + "/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Новый пост", body: "Текст поста", userId: 1 })
        });
        var data = await response.json();
        displayOutput("crud-output", "POST: создан пост с ID " + data.id + "\n" + JSON.stringify(data, null, 2));
    } catch (error) { displayOutput("crud-output", error, true); }
}

async function fetchPutRequest() {
    try {
        var response = await fetch(API_BASE_URL + "/posts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 1, title: "Обновлено", body: "Новый текст", userId: 1 })
        });
        var data = await response.json();
        displayOutput("crud-output", "PUT: пост " + data.id + " обновлён полностью\n" + JSON.stringify(data, null, 2));
    } catch (error) { displayOutput("crud-output", error, true); }
}

async function fetchPatchRequest() {
    try {
        var response = await fetch(API_BASE_URL + "/posts/1", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Только заголовок обновлён" })
        });
        var data = await response.json();
        displayOutput("crud-output", "PATCH: обновлён только title\n" + JSON.stringify(data, null, 2) + "\n\nОтличие от PUT — частичное обновление.");
    } catch (error) { displayOutput("crud-output", error, true); }
}

async function fetchDeleteRequest() {
    try {
        var response = await fetch(API_BASE_URL + "/posts/1", { method: "DELETE" });
        if (response.status === 200 || response.status === 204) {
            displayOutput("crud-output", "DELETE: пост успешно удалён (статус " + response.status + ")");
        } else {
            displayOutput("crud-output", "DELETE: статус " + response.status, true);
        }
    } catch (error) { displayOutput("crud-output", error, true); }
}

function setupCrudRequests() {
    var b1 = document.getElementById("fetch-post");
    var b2 = document.getElementById("fetch-put");
    var b3 = document.getElementById("fetch-patch");
    var b4 = document.getElementById("fetch-delete");
    if (b1) b1.addEventListener("click", fetchPostRequest);
    if (b2) b2.addEventListener("click", fetchPutRequest);
    if (b3) b3.addEventListener("click", fetchPatchRequest);
    if (b4) b4.addEventListener("click", fetchDeleteRequest);
}

// ЗАДАНИЕ 3: Заголовки и параметры
async function fetchWithHeaders() {
    var headers = { "X-Custom-Header": "MyCustomValue", "Authorization": "Bearer test-token-12345" };
    try {
        var response = await fetch(API_BASE_URL + "/posts/1", { headers: headers });
        var data = await response.json();
        displayOutput("headers-output", "Отправленные заголовки:\n" + JSON.stringify(headers, null, 2) + "\n\nПолучен пост ID " + data.id);
    } catch (error) { displayOutput("headers-output", error, true); }
}

async function fetchWithAuth() {
    var basicAuth = btoa("user:password");
    var headers = { "Authorization": "Basic " + basicAuth };
    try {
        var response = await fetch(API_BASE_URL + "/posts/1", { headers: headers });
        displayOutput("headers-output", "Basic Auth: Authorization: Basic " + basicAuth + "\n\nBearer Token пример: Authorization: Bearer <token>\nСтатус: " + response.status);
    } catch (error) { displayOutput("headers-output", error, true); }
}

async function fetchWithParams() {
    var url = new URL(API_BASE_URL + "/posts");
    url.searchParams.append("_limit", "5");
    url.searchParams.append("_sort", "id");
    url.searchParams.append("_order", "desc");
    try {
        var response = await fetch(url);
        var data = await response.json();
        displayOutput("headers-output", "URL: " + url.toString() + "\n\nПолучено " + data.length + " постов (сортировка по id desc)");
    } catch (error) { displayOutput("headers-output", error, true); }
}

async function fetchWithTimeout() {
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 3000);
    try {
        var response = await fetch(API_BASE_URL + "/posts", { signal: controller.signal });
        var data = await response.json();
        displayOutput("headers-output", "Успешно за 3 секунды: " + data.length + " постов");
    } catch (error) {
        if (error.name === "AbortError") {
            displayOutput("headers-output", "Таймаут: запрос отменён через 3 секунды (сетевой таймаут vs ручная отмена — AbortController).", true);
        } else {
            displayOutput("headers-output", error, true);
        }
    } finally { clearTimeout(timeout); }
}

function setupHeadersAndParams() {
    var b1 = document.getElementById("fetch-headers");
    var b2 = document.getElementById("fetch-auth");
    var b3 = document.getElementById("fetch-params");
    var b4 = document.getElementById("fetch-timeout");
    if (b1) b1.addEventListener("click", fetchWithHeaders);
    if (b2) b2.addEventListener("click", fetchWithAuth);
    if (b3) b3.addEventListener("click", fetchWithParams);
    if (b4) b4.addEventListener("click", fetchWithTimeout);
}

// ЗАДАНИЕ 4: Обработка ответов
async function fetchAndCheckStatus() {
    try {
        var response = await fetch(API_BASE_URL + "/posts/1");
        if (!response.ok) throw new Error("HTTP " + response.status);
        displayOutput("response-output", "Статус: " + response.status + " (OK). response.ok = true");
    } catch (error) { displayOutput("response-output", error, true); }
}

async function fetchAndReadHeaders() {
    try {
        var response = await fetch(API_BASE_URL + "/posts/1");
        var list = [];
        response.headers.forEach(function (value, key) { list.push(key + ": " + value); });
        displayOutput("response-output", "Заголовки ответа:\n" + list.join("\n"));
    } catch (error) { displayOutput("response-output", error, true); }
}

async function fetchBlobData() {
    try {
        var response = await fetch("https://picsum.photos/200/300");
        var blob = await response.blob();
        var imageUrl = URL.createObjectURL(blob);
        displayData("response-data", '<img src="' + imageUrl + '" alt="Blob" style="max-width:200px; border-radius:8px;">');
        displayOutput("response-output", "Blob получен: " + blob.size + " байт, тип " + blob.type);
    } catch (error) { displayOutput("response-output", error, true); }
}

async function fetchWithFormData() {
    var formData = new FormData();
    formData.append("title", "Заголовок через FormData");
    formData.append("body", "Тело через FormData");
    formData.append("userId", "1");
    try {
        var response = await fetch(API_BASE_URL + "/posts", { method: "POST", body: formData });
        var data = await response.json();
        displayOutput("response-output", "FormData отправлена.\nОтличие: JSON → application/json, FormData → multipart/form-data.\nОтвет: ID " + data.id);
    } catch (error) { displayOutput("response-output", error, true); }
}

function setupResponseHandling() {
    var b1 = document.getElementById("fetch-status");
    var b2 = document.getElementById("fetch-response-headers");
    var b3 = document.getElementById("fetch-blob");
    var b4 = document.getElementById("fetch-formdata");
    if (b1) b1.addEventListener("click", fetchAndCheckStatus);
    if (b2) b2.addEventListener("click", fetchAndReadHeaders);
    if (b3) b3.addEventListener("click", fetchBlobData);
    if (b4) b4.addEventListener("click", fetchWithFormData);
}

// ЗАДАНИЕ 5: Обработка ошибок
async function fetchNetworkError() {
    try { await fetch("https://nonexistent-domain-abc123xyz.com/api"); }
    catch (error) { displayOutput("error-output", "Сетевая ошибка: " + error.message, true); }
}

async function fetchHttpError() {
    try {
        var response = await fetch(API_BASE_URL + "/nonexistent-endpoint");
        if (!response.ok) throw new Error("HTTP " + response.status + ": " + response.statusText);
        var data = await response.json();
    } catch (error) { displayOutput("error-output", "HTTP ошибка: " + error.message, true); }
}

async function fetchWithAbort() {
    var controller = new AbortController();
    setTimeout(function () { controller.abort(); }, 100);
    try {
        await fetch(API_BASE_URL + "/posts", { signal: controller.signal });
        displayOutput("error-output", "Запрос завершился до отмены");
    } catch (error) { displayOutput("error-output", "Запрос отменён: " + error.name, true); }
}

async function fetchWithRetry(url, options, retries) {
    if (options === undefined) options = {};
    if (retries === undefined) retries = 3;
    for (var i = 0; i < retries; i++) {
        try {
            var response = await fetch(url, options);
            if (!response.ok) throw new Error("HTTP " + response.status);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            var delay = 1000 * Math.pow(2, i);
            await new Promise(function (resolve) { setTimeout(resolve, delay); });
        }
    }
}

async function testRetry() {
    try {
        var data = await fetchWithRetry(API_BASE_URL + "/posts/1");
        displayOutput("error-output", "Retry успешен: получен пост ID " + data.id);
    } catch (error) { displayOutput("error-output", "После всех попыток: " + error.message, true); }
}

function setupErrorHandling() {
    var b1 = document.getElementById("fetch-network-error");
    var b2 = document.getElementById("fetch-http-error");
    var b3 = document.getElementById("fetch-abort");
    var b4 = document.getElementById("fetch-retry");
    if (b1) b1.addEventListener("click", fetchNetworkError);
    if (b2) b2.addEventListener("click", fetchHttpError);
    if (b3) b3.addEventListener("click", fetchWithAbort);
    if (b4) b4.addEventListener("click", testRetry);
}

// ЗАДАНИЕ 6: Параллельные запросы
async function fetchWithPromiseAll() {
    var start = Date.now();
    try {
        var results = await Promise.all([
            fetch(API_BASE_URL + "/users").then(function (r) { return r.json(); }),
            fetch(API_BASE_URL + "/posts").then(function (r) { return r.json(); }),
            fetch(API_BASE_URL + "/comments").then(function (r) { return r.json(); })
        ]);
        var elapsed = Date.now() - start;
        displayOutput("parallel-output", "Promise.all: users=" + results[0].length + ", posts=" + results[1].length + ", comments=" + results[2].length + "\nОбщее время: " + elapsed + "мс");
    } catch (error) { displayOutput("parallel-output", error, true); }
}

async function fetchWithPromiseRace() {
    var start = Date.now();
    var fast = fetch(API_BASE_URL + "/posts/1").then(function (r) { return r.json(); });
    var slow = new Promise(function (resolve) { setTimeout(function () { resolve({ title: "Медленный запрос" }); }, 3000); });
    try {
        var result = await Promise.race([fast, slow]);
        displayOutput("parallel-output", "Promise.race: победил " + (result.title || "пост ID " + result.id) + "\nВремя: " + (Date.now() - start) + "мс");
    } catch (error) { displayOutput("parallel-output", error, true); }
}

async function fetchSequentialRequests() {
    var start = Date.now();
    try {
        var user = await fetch(API_BASE_URL + "/users/1").then(function (r) { return r.json(); });
        var posts = await fetch(API_BASE_URL + "/posts?userId=1").then(function (r) { return r.json(); });
        var comments = await fetch(API_BASE_URL + "/comments?postId=" + posts[0].id).then(function (r) { return r.json(); });
        var elapsed = Date.now() - start;
        displayOutput("parallel-output", "Последовательно:\nПользователь: " + user.name + "\nПостов: " + posts.length + "\nКомментариев: " + comments.length + "\nВремя: " + elapsed + "мс (дольше, чем Promise.all)");
    } catch (error) { displayOutput("parallel-output", error, true); }
}

function setupParallelRequests() {
    var b1 = document.getElementById("promise-all");
    var b2 = document.getElementById("promise-race");
    var b3 = document.getElementById("sequential");
    if (b1) b1.addEventListener("click", fetchWithPromiseAll);
    if (b2) b2.addEventListener("click", fetchWithPromiseRace);
    if (b3) b3.addEventListener("click", fetchSequentialRequests);
}

// ЗАДАНИЕ 7: Реальные сценарии
async function fetchUserWithPosts() {
    try {
        var user = await fetch(API_BASE_URL + "/users/1").then(function (r) { return r.json(); });
        var posts = await fetch(API_BASE_URL + "/posts?userId=1").then(function (r) { return r.json(); });
        var html = '<div class="user-card">' +
            '<h4>' + user.name + '</h4>' +
            '<p>Email: ' + user.email + '</p>' +
            '<p>Город: ' + user.address.city + '</p>' +
            '<p>Постов: ' + posts.length + '</p>' +
            '<h5>Последние посты:</h5>' +
            '<ul>' + posts.slice(0, 3).map(function (p) { return "<li>" + p.title + "</li>"; }).join("") + '</ul>' +
        '</div>';
        document.getElementById("scenario-output").innerHTML = html;
    } catch (error) { displayOutput("scenario-output", error, true); }
}

async function fetchWithSearch() {
    var query = "qui";
    var url = buildUrl(API_BASE_URL + "/posts", { q: query });
    try {
        var response = await fetch(url);
        var data = await response.json();
        displayOutput("scenario-output", "Поиск по '" + query + "': найдено " + data.length + " постов\nURL: " + url);
    } catch (error) { displayOutput("scenario-output", error, true); }
}

async function simulateFileUpload() {
    var fill = document.getElementById("progress-fill");
    if (!fill) return;
    var formData = new FormData();
    var blob = new Blob(["test content"], { type: "text/plain" });
    formData.append("file", blob, "test.txt");
    for (var i = 0; i <= 100; i += 10) {
        fill.style.width = i + "%";
        displayOutput("scenario-output", "Загрузка: " + i + "%");
        await new Promise(function (r) { setTimeout(r, 200); });
    }
    displayOutput("scenario-output", "Загрузка завершена! (симуляция)");
}

function createFetchCache() {
    var cache = new Map();
    var TTL = 60000;
    return async function cachedFetch(url, options) {
        if (options === undefined) options = {};
        var key = url + JSON.stringify(options);
        var cached = cache.get(key);
        if (cached && Date.now() - cached.time < TTL) {
            displayOutput("scenario-output", "Из кэша: " + url + " (осталось TTL: " + Math.round((TTL - (Date.now() - cached.time)) / 1000) + "с)");
            return cached.data;
        }
        var response = await fetch(url, options);
        var data = await response.json();
        cache.set(key, { data: data, time: Date.now() });
        displayOutput("scenario-output", "Запрос: " + url + " (сохранён в кэш на 60с)");
        return data;
    };
}

async function testCache() {
    var cachedFetch = createFetchCache();
    var url = API_BASE_URL + "/posts/1";
    await cachedFetch(url);
    await new Promise(function (r) { setTimeout(r, 500); });
    await cachedFetch(url);
    await cachedFetch(url);
}

function setupRealScenarios() {
    var b1 = document.getElementById("user-with-posts");
    var b2 = document.getElementById("fetch-search");
    var b3 = document.getElementById("upload-simulation");
    var b4 = document.getElementById("cache-requests");
    if (b1) b1.addEventListener("click", fetchUserWithPosts);
    if (b2) b2.addEventListener("click", fetchWithSearch);
    if (b3) b3.addEventListener("click", simulateFileUpload);
    if (b4) b4.addEventListener("click", testCache);
}

// ИНИЦИАЛИЗАЦИЯ
function initializeFetchAPI() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();
    document.querySelectorAll("button").forEach(function (btn) {
        btn.setAttribute("data-original-text", btn.textContent);
    });
    console.log("Все обработчики Fetch API инициализированы!");
}
document.addEventListener("DOMContentLoaded", initializeFetchAPI);
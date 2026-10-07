// === АСИНХРОННЫЕ ОПЕРАЦИИ - ОСНОВНЫЕ ЗАДАНИЯ ===

function displayOutput(elementId, data, isError) {
    if (isError === undefined) isError = false;
    var output = document.getElementById(elementId);
    if (!output) return;
    var content = typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
    output.innerHTML = "[" + new Date().toLocaleTimeString() + "] " + content;
    output.className = "output " + (isError ? "error" : "success");
}

function updateProgress(percentage) {
    var progressFill = document.getElementById("progress-fill");
    if (progressFill) progressFill.style.width = percentage + "%";
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
        button.innerHTML = button.getAttribute("data-original") || "Готово";
    }
}

// ЗАДАНИЕ 1: Основы промисов
function createBasicPromise(shouldResolve) {
    if (shouldResolve === undefined) shouldResolve = true;
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (shouldResolve) resolve("Успех!");
            else reject(new Error("Ошибка!"));
        }, 1000);
    });
}

function handleBasicPromise() {
    displayOutput("promise-output", "Загрузка...");
    createBasicPromise(true)
        .then(function (result) { displayOutput("promise-output", result); })
        .catch(function (error) { displayOutput("promise-output", error.message, true); });
}

function createPromiseChain() {
    displayOutput("promise-output", "Цепочка запущена...");
    var start = Date.now();
    createBasicPromise(true)
        .then(function (r) { displayOutput("promise-output", r + " → шаг 1"); return createBasicPromise(true); })
        .then(function (r) { displayOutput("promise-output", r + " → шаг 2"); return createBasicPromise(true); })
        .then(function (r) { displayOutput("promise-output", r + " → шаг 3. Время: " + (Date.now() - start) + "мс"); })
        .catch(function (e) { displayOutput("promise-output", e.message, true); });
}

function handlePromiseError() {
    displayOutput("promise-output", "Загрузка с ошибкой...");
    createBasicPromise(false).catch(function (e) { displayOutput("promise-output", e.message, true); });
}

function setupPromiseEvents() {
    var btn1 = document.getElementById("basic-promise");
    var btn2 = document.getElementById("promise-chain");
    var btn3 = document.getElementById("promise-error");
    if (btn1) btn1.addEventListener("click", handleBasicPromise);
    if (btn2) btn2.addEventListener("click", createPromiseChain);
    if (btn3) btn3.addEventListener("click", handlePromiseError);
}

// ЗАДАНИЕ 2: Async/Await
async function basicAsyncAwait() {
    displayOutput("async-output", "Загрузка...");
    try {
        var result = await createBasicPromise(true);
        displayOutput("async-output", result + " (async/await)");
    } catch (error) { displayOutput("async-output", error.message, true); }
}

async function handleAsyncError() {
    try {
        await createBasicPromise(false);
    } catch (error) { displayOutput("async-output", "Обработано в try/catch: " + error.message, true); }
}

async function parallelAsyncExecution() {
    var start = Date.now();
    displayOutput("async-output", "Параллельный запуск...");
    try {
        var results = await Promise.all([
            createBasicPromise(true),
            createBasicPromise(true),
            createBasicPromise(true)
        ]);
        displayOutput("async-output",
            "Все промисы: " + results.join(", ") +
            "\nВремя: " + (Date.now() - start) + "мс (параллельно ≈1000мс)");
    } catch (error) { displayOutput("async-output", error.message, true); }
}

function setupAsyncEvents() {
    var btn1 = document.getElementById("basic-async");
    var btn2 = document.getElementById("async-error");
    var btn3 = document.getElementById("async-parallel");
    if (btn1) btn1.addEventListener("click", basicAsyncAwait);
    if (btn2) btn2.addEventListener("click", handleAsyncError);
    if (btn3) btn3.addEventListener("click", parallelAsyncExecution);
}

// ЗАДАНИЕ 3: Работа с внешними API
async function fetchUsers() {
    setLoadingState("fetch-users", true);
    displayOutput("api-output", "Загрузка пользователей...");
    try {
        var response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("HTTP " + response.status);
        var data = await response.json();
        var container = document.getElementById("api-data");
        container.innerHTML = data.map(function (u) {
            return '<div class="user-card"><h4>' + u.name + '</h4><p>Email: ' + u.email + '</p><p>Тел: ' + u.phone + '</p></div>';
        }).join("");
        displayOutput("api-output", "Загружено " + data.length + " пользователей");
    } catch (error) { displayOutput("api-output", error.message, true); }
    finally { setLoadingState("fetch-users", false); }
}

async function createPost() {
    try {
        var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Новый пост", body: "Текст поста", userId: 1 })
        });
        var data = await response.json();
        displayOutput("api-output", "Пост создан с ID " + data.id + "\n" + JSON.stringify(data, null, 2));
    } catch (error) { displayOutput("api-output", error.message, true); }
}

async function testApiError() {
    try {
        await fetch("https://jsonplaceholder.typicode.com/nonexistent-endpoint");
        displayOutput("api-output", "Запрос выполнен");
    } catch (error) { displayOutput("api-output", "Ошибка: " + error.message, true); }
}

function setupApiEvents() {
    var btn1 = document.getElementById("fetch-users");
    var btn2 = document.getElementById("fetch-post");
    var btn3 = document.getElementById("fetch-error");
    if (btn1) btn1.addEventListener("click", fetchUsers);
    if (btn2) btn2.addEventListener("click", createPost);
    if (btn3) btn3.addEventListener("click", testApiError);
}

// ЗАДАНИЕ 6: Параллельные операции
async function demonstratePromiseAll() {
    var start = Date.now();
    try {
        var results = await Promise.all([
            createBasicPromise(true),
            createBasicPromise(true),
            createBasicPromise(true)
        ]);
        displayOutput("parallel-output",
            "Promise.all: " + results.join(", ") +
            "\nВремя: " + (Date.now() - start) + "мс");
    } catch (error) { displayOutput("parallel-output", error.message, true); }
}

async function demonstratePromiseRace() {
    var fast = new Promise(function (res) { setTimeout(function () { res("Быстрый"); }, 500); });
    var slow = new Promise(function (res) { setTimeout(function () { res("Медленный"); }, 2000); });
    try {
        var result = await Promise.race([fast, slow]);
        displayOutput("parallel-output", "Promise.race: победил " + result + " (500мс)");
    } catch (error) { displayOutput("parallel-output", error.message, true); }
}

async function demonstratePromiseAllSettled() {
    var results = await Promise.allSettled([
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true)
    ]);
    var summary = results.map(function (r, i) {
        return "Промис " + (i + 1) + ": " + r.status + (r.status === "rejected" ? " (" + r.reason.message + ")" : " (" + r.value + ")");
    }).join("\n");
    displayOutput("parallel-output", "Promise.allSettled:\n" + summary);
}

function setupParallelEvents() {
    var btn1 = document.getElementById("promise-all");
    var btn2 = document.getElementById("promise-race");
    var btn3 = document.getElementById("promise-allSettled");
    if (btn1) btn1.addEventListener("click", demonstratePromiseAll);
    if (btn2) btn2.addEventListener("click", demonstratePromiseRace);
    if (btn3) btn3.addEventListener("click", demonstratePromiseAllSettled);
}

// ЗАДАНИЕ 7: Реальные сценарии
async function sequentialApiRequests() {
    var start = Date.now();
    try {
        var user = await fetch("https://jsonplaceholder.typicode.com/users/1").then(function (r) { return r.json(); });
        displayOutput("scenario-output", "1. Пользователь: " + user.name);
        var posts = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(function (r) { return r.json(); });
        displayOutput("scenario-output", "1. Пользователь: " + user.name + "\n2. Постов: " + posts.length);
        var comments = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + posts[0].id).then(function (r) { return r.json(); });
        displayOutput("scenario-output",
            "1. Пользователь: " + user.name +
            "\n2. Постов: " + posts.length +
            "\n3. Комментариев к первому посту: " + comments.length +
            "\nВремя: " + (Date.now() - start) + "мс (последовательно)");
    } catch (error) { displayOutput("scenario-output", error.message, true); }
}

async function simulateFileUpload() {
    for (var i = 0; i <= 100; i += 10) {
        updateProgress(i);
        displayOutput("scenario-output", "Загрузка: " + i + "%");
        await new Promise(function (r) { setTimeout(r, 100); });
    }
    displayOutput("scenario-output", "Загрузка завершена!");
}

function createRequestCache() {
    var cache = new Map();
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            displayOutput("scenario-output", "Из кэша: " + url + "\nДанные: " + JSON.stringify(cache.get(url)).slice(0, 100) + "...");
            return cache.get(url);
        }
        var data = await fetch(url).then(function (r) { return r.json(); });
        cache.set(url, data);
        displayOutput("scenario-output", "Запрос выполнен: " + url + "\nДанные: " + JSON.stringify(data).slice(0, 100) + "...");
        return data;
    };
}

async function testCache() {
    var cachedRequest = createRequestCache();
    await cachedRequest("https://jsonplaceholder.typicode.com/posts/1");
    await new Promise(function (r) { setTimeout(r, 500); });
    await cachedRequest("https://jsonplaceholder.typicode.com/posts/1");
    await cachedRequest("https://jsonplaceholder.typicode.com/posts/1");
}

function setupRealScenarioEvents() {
    var btn1 = document.getElementById("sequential-requests");
    var btn2 = document.getElementById("upload-simulation");
    var btn3 = document.getElementById("cache-requests");
    if (btn1) btn1.addEventListener("click", sequentialApiRequests);
    if (btn2) btn2.addEventListener("click", simulateFileUpload);
    if (btn3) btn3.addEventListener("click", testCache);
}

// ИНИЦИАЛИЗАЦИЯ
function initializeAsyncOperations() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
    console.log("Все асинхронные обработчики инициализированы!");
}
document.addEventListener("DOMContentLoaded", initializeAsyncOperations);
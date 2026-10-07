function runTest(name, actual, expected) {
    var ok = JSON.stringify(actual) === JSON.stringify(expected);
    var el = document.createElement("div");
    el.className = "test-result " + (ok ? "success" : "error");
    el.textContent = name + ": " + (ok ? "✅ УСПЕХ" : "❌ ОШИБКА");
    document.body.appendChild(el);
    console.log(name + ": " + (ok ? "✅" : "❌"));
}

document.addEventListener("DOMContentLoaded", function () {
    runTest("createBasicPromise — функция", typeof createBasicPromise, "function");
    runTest("handleBasicPromise — функция", typeof handleBasicPromise, "function");
    runTest("createPromiseChain — функция", typeof createPromiseChain, "function");
    runTest("handlePromiseError — функция", typeof handlePromiseError, "function");
    runTest("basicAsyncAwait — функция", typeof basicAsyncAwait, "function");
    runTest("handleAsyncError — функция", typeof handleAsyncError, "function");
    runTest("parallelAsyncExecution — функция", typeof parallelAsyncExecution, "function");
    runTest("fetchUsers — функция", typeof fetchUsers, "function");
    runTest("createPost — функция", typeof createPost, "function");
    runTest("testApiError — функция", typeof testApiError, "function");
    runTest("demonstratePromiseAll — функция", typeof demonstratePromiseAll, "function");
    runTest("demonstratePromiseRace — функция", typeof demonstratePromiseRace, "function");
    runTest("demonstratePromiseAllSettled — функция", typeof demonstratePromiseAllSettled, "function");
    runTest("sequentialApiRequests — функция", typeof sequentialApiRequests, "function");
    runTest("simulateFileUpload — функция", typeof simulateFileUpload, "function");
    runTest("createRequestCache — функция", typeof createRequestCache, "function");

    createBasicPromise(true).then(function (r) {
        runTest("createBasicPromise resolve", r, "Успех!");
    });
    createBasicPromise(false).catch(function (e) {
        runTest("createBasicPromise reject", e.message, "Ошибка!");
    });
});
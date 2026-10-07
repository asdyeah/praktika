function runTest(name, actual, expected) {
    var ok = JSON.stringify(actual) === JSON.stringify(expected);
    var el = document.createElement("div");
    el.className = "test-result " + (ok ? "success" : "error");
    el.textContent = name + ": " + (ok ? "✅ УСПЕХ" : "❌ ОШИБКА");
    document.body.appendChild(el);
    console.log(name + ": " + (ok ? "✅" : "❌"));
}

document.addEventListener("DOMContentLoaded", function () {
    runTest("fetchGetRequest — функция", typeof fetchGetRequest, "function");
    runTest("fetchJsonData — функция", typeof fetchJsonData, "function");
    runTest("fetchWithError — функция", typeof fetchWithError, "function");
    runTest("fetchPostRequest — функция", typeof fetchPostRequest, "function");
    runTest("fetchPutRequest — функция", typeof fetchPutRequest, "function");
    runTest("fetchPatchRequest — функция", typeof fetchPatchRequest, "function");
    runTest("fetchDeleteRequest — функция", typeof fetchDeleteRequest, "function");
    runTest("fetchWithHeaders — функция", typeof fetchWithHeaders, "function");
    runTest("fetchWithAuth — функция", typeof fetchWithAuth, "function");
    runTest("fetchWithParams — функция", typeof fetchWithParams, "function");
    runTest("fetchWithTimeout — функция", typeof fetchWithTimeout, "function");
    runTest("fetchAndCheckStatus — функция", typeof fetchAndCheckStatus, "function");
    runTest("fetchAndReadHeaders — функция", typeof fetchAndReadHeaders, "function");
    runTest("fetchBlobData — функция", typeof fetchBlobData, "function");
    runTest("fetchWithFormData — функция", typeof fetchWithFormData, "function");
    runTest("fetchNetworkError — функция", typeof fetchNetworkError, "function");
    runTest("fetchHttpError — функция", typeof fetchHttpError, "function");
    runTest("fetchWithAbort — функция", typeof fetchWithAbort, "function");
    runTest("fetchWithRetry — функция", typeof fetchWithRetry, "function");
    runTest("fetchWithPromiseAll — функция", typeof fetchWithPromiseAll, "function");
    runTest("fetchWithPromiseRace — функция", typeof fetchWithPromiseRace, "function");
    runTest("fetchSequentialRequests — функция", typeof fetchSequentialRequests, "function");
    runTest("fetchUserWithPosts — функция", typeof fetchUserWithPosts, "function");
    runTest("fetchWithSearch — функция", typeof fetchWithSearch, "function");
    runTest("simulateFileUpload — функция", typeof simulateFileUpload, "function");
    runTest("createFetchCache — функция", typeof createFetchCache, "function");
});
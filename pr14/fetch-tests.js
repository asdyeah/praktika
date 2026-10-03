function runTest(name, actual, expected) {
var ok = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (ok ? 'success' : 'error');
el.textContent = name + ': ' + (ok ? 'OK' : 'FAIL');
document.body.appendChild(el);
}
document.addEventListener('DOMContentLoaded', function() {
setTimeout(function() {
runTest('fetch-get', !!document.getElementById('fetch-get'), true);
runTest('fetch-post', !!document.getElementById('fetch-post'), true);
runTest('get-data', !!document.getElementById('get-data'), true);
}, 300);
});

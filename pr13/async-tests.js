function runTest(name, actual, expected) {
var ok = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (ok ? 'success' : 'error');
el.textContent = name + ': ' + (ok ? 'OK' : 'FAIL');
document.body.appendChild(el);
}
document.addEventListener('DOMContentLoaded', function() {
setTimeout(function() {
runTest('basic-promise', !!document.getElementById('basic-promise'), true);
runTest('fetch-users', !!document.getElementById('fetch-users'), true);
runTest('api-data', !!document.getElementById('api-data'), true);
}, 300);
});

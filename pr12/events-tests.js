function runTest(name, actual, expected) {
var ok = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (ok ? 'test-success' : 'test-failure');
el.textContent = name + ': ' + (ok ? 'OK' : 'FAIL');
document.body.appendChild(el);
}
document.addEventListener('DOMContentLoaded', function() {
setTimeout(function() {
runTest('Кнопка basic-btn', !!document.getElementById('basic-btn'), true);
runTest('Список item-list', !!document.getElementById('item-list'), true);
runTest('Ссылка prevent-link', !!document.getElementById('prevent-link'), true);
}, 200);
});

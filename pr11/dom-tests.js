function runTest(name, actual, expected) {
var ok = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (ok ? 'test-success' : 'test-failure');
el.textContent = name + ': ' + (ok ? 'OK' : 'FAIL');
document.body.appendChild(el);
}
document.addEventListener('DOMContentLoaded', function() {
setTimeout(function() {
runTest('countChildren', countChildren(), 3);
runTest('findSpecialChild', findSpecialChild(), 'Особый дочерний элемент');
var cards = document.querySelectorAll('#target1 .card');
runTest('createCard', cards.length >= 1, true);
}, 100);
});

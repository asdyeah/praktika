function handleBasicClick(event) {
var output = document.getElementById('basic-output');
if (!output) return;
output.textContent = 'Тип: ' + event.type + ', X: ' + event.clientX + ', Y: ' + event.clientY;
event.target.classList.add('pulse');
setTimeout(function() { event.target.classList.remove('pulse'); }, 500);
}
function handleMouseEvents(event) {
var box = document.getElementById('color-box');
var output = document.getElementById('mouse-output');
if (!box || !output) return;
if (event.type === 'mouseenter') box.style.background = '#e74c3c';
if (event.type === 'mouseleave') box.style.background = '#3498db';
if (event.type === 'mousemove') output.textContent = 'Координаты: X=' + event.clientX + ', Y=' + event.clientY;
}
function setupBasicEvents() {
var btn = document.getElementById('basic-btn');
var box = document.getElementById('color-box');
if (btn) btn.addEventListener('click', handleBasicClick);
if (box) {
box.addEventListener('mouseenter', handleMouseEvents);
box.addEventListener('mouseleave', handleMouseEvents);
box.addEventListener('mousemove', handleMouseEvents);
}
}
function setupKeyboardEvents() {
var input = document.getElementById('key-input');
var output = document.getElementById('key-output');
if (!input || !output) return;
input.addEventListener('keydown', function(e) {
output.textContent = 'key: ' + e.key + ', code: ' + e.code + ', ctrl: ' + e.ctrlKey + ', alt: ' + e.altKey + ', shift: ' + e.shiftKey;
if (e.ctrlKey && e.key === 's') { e.preventDefault(); output.textContent += ' [Ctrl+S перехвачено]'; }
if (e.altKey && e.key === 'c') { e.preventDefault(); output.textContent += ' [Alt+C перехвачено]'; }
});
input.addEventListener('keyup', function() {});
}
function setupDelegationEvents() {
var list = document.getElementById('item-list');
if (!list) return;
list.addEventListener('click', function(e) {
if (e.target.classList.contains('delete')) e.target.parentElement.remove();
else if (e.target.classList.contains('item')) e.target.classList.toggle('selected');
var output = document.getElementById('delegation-output');
if (output) {
var selected = list.querySelectorAll('.item.selected').length;
output.textContent = 'Выбрано элементов: ' + selected;
}
});
var addBtn = document.getElementById('add-item-btn');
if (addBtn) {
addBtn.addEventListener('click', function() {
var item = document.createElement('div');
item.className = 'item';
item.dataset.id = Date.now();
item.innerHTML = 'Новый элемент <span class="delete">X</span>';
list.appendChild(item);
});
}
}
function setupPreventionEvents() {
var link = document.getElementById('prevent-link');
var form = document.getElementById('prevent-form');
var output = document.getElementById('prevention-output');
if (link) {
link.addEventListener('click', function(e) {
e.preventDefault();
if (output) output.textContent = 'Переход по ссылке предотвращён';
link.classList.add('shake');
setTimeout(function() { link.classList.remove('shake'); }, 300);
});
}
if (form) {
form.addEventListener('submit', function(e) {
e.preventDefault();
var input = form.querySelector('input');
if (output) output.textContent = input && input.value ? 'Форма отправлена: ' + input.value : 'Форма пустая';
});
}
}
function triggerCustomEvent() {
var event = new CustomEvent('customAction', { detail: { message: 'Привет от кастомного события!' } });
document.dispatchEvent(event);
}
function handleCustomEvent(event) {
var output = document.getElementById('custom-output');
if (output) output.textContent = event.detail.message;
}
function setupCustomEvents() {
document.addEventListener('customAction', handleCustomEvent);
var trigger = document.getElementById('trigger-custom');
if (trigger) trigger.addEventListener('click', triggerCustomEvent);
var multiple = document.getElementById('multiple-listeners');
if (multiple) {
multiple.addEventListener('click', function() {
document.addEventListener('customAction', function() { console.log('Обработчик 1'); });
document.addEventListener('customAction', function() { console.log('Обработчик 2'); });
document.addEventListener('customAction', function() { console.log('Обработчик 3'); });
triggerCustomEvent();
});
}
}
function setupLoadingEvents() {
var loadBtn = document.getElementById('load-image');
var errorBtn = document.getElementById('load-error');
var container = document.getElementById('image-container');
if (loadBtn && container) {
loadBtn.addEventListener('click', function() {
container.innerHTML = '';
var img = document.createElement('img');
img.src = 'https://picsum.photos/200/300';
img.onload = function() { container.classList.add('success'); };
img.onerror = function() { container.innerHTML = 'Ошибка'; };
container.appendChild(img);
});
}
if (errorBtn && container) {
errorBtn.addEventListener('click', function() {
container.innerHTML = '';
var img = document.createElement('img');
img.src = 'https://nonexistent.example/image.jpg';
img.onerror = function() { container.innerHTML = 'Ошибка загрузки'; };
container.appendChild(img);
});
}
}
var timerInterval;
var timerValue = 0;
function startTimer() {
var output = document.getElementById('timer-output');
if (timerInterval) return;
timerInterval = setInterval(function() {
timerValue++;
if (output) output.textContent = 'Таймер: ' + timerValue;
}, 1000);
}
function stopTimer() {
clearInterval(timerInterval);
timerInterval = null;
timerValue = 0;
var output = document.getElementById('timer-output');
if (output) output.textContent = 'Таймер: 0';
}
function createDebounce(func, delay) {
var timeoutId;
return function() {
var args = Array.prototype.slice.call(arguments);
var ctx = this;
clearTimeout(timeoutId);
timeoutId = setTimeout(function() { func.apply(ctx, args); }, delay);
};
}
function createThrottle(func, interval) {
var lastTime = 0;
return function() {
var args = Array.prototype.slice.call(arguments);
var ctx = this;
var now = Date.now();
if (now - lastTime >= interval) { lastTime = now; func.apply(ctx, args); }
};
}
function testDebounce() {
var output = document.getElementById('async-output');
if (!output) return;
var count = 0;
var debounced = createDebounce(function() { count++; output.textContent = 'Debounce вызовов: ' + count; }, 500);
for (var i = 0; i < 5; i++) debounced();
}
function testThrottle() {
var output = document.getElementById('async-output');
if (!output) return;
var count = 0;
var throttled = createThrottle(function() { count++; output.textContent = 'Throttle вызовов: ' + count; }, 500);
for (var i = 0; i < 5; i++) throttled();
}
function setupTimerEvents() {
var b1 = document.getElementById('start-timer');
var b2 = document.getElementById('stop-timer');
var b3 = document.getElementById('debounce-btn');
var b4 = document.getElementById('throttle-btn');
if (b1) b1.addEventListener('click', startTimer);
if (b2) b2.addEventListener('click', stopTimer);
if (b3) b3.addEventListener('click', testDebounce);
if (b4) b4.addEventListener('click', testThrottle);
}
function initializeEvents() {
setupBasicEvents();
setupKeyboardEvents();
setupDelegationEvents();
setupPreventionEvents();
setupCustomEvents();
setupLoadingEvents();
setupTimerEvents();
console.log('Все обработчики инициализированы!');
}
document.addEventListener('DOMContentLoaded', initializeEvents);

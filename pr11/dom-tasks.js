function createCard(title, content) {
var container = document.getElementById('target1');
if (!container) return;
var card = document.createElement('div');
card.className = 'card';
var h4 = document.createElement('h4');
h4.textContent = title;
var p = document.createElement('p');
p.textContent = content;
card.appendChild(h4);
card.appendChild(p);
container.appendChild(card);
}
function createList(items) {
var container = document.getElementById('target1');
if (!container) return;
var ol = document.createElement('ol');
items.forEach(function(item) {
var li = document.createElement('li');
li.textContent = item;
ol.appendChild(li);
});
container.appendChild(ol);
}
function countChildren() {
var parent = document.getElementById('parent-element');
return parent ? parent.children.length : 0;
}
function findSpecialChild() {
var special = document.querySelector('#parent-element .special');
return special ? special.textContent : '';
}
function getParentBackground() {
var child = document.querySelector('.child');
if (!child) return '';
return window.getComputedStyle(child.parentElement).backgroundColor;
}
function setupStyleToggle() {
var btn = document.getElementById('toggle-style');
var target = document.getElementById('style-target');
if (!btn || !target) return;
btn.addEventListener('click', function() { target.classList.toggle('active-style'); });
}
function changeHeaderColor() {
var header = document.getElementById('main-header');
if (!header) return;
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
header.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}
function animateElement() {
var el = document.getElementById('style-target');
if (!el) return;
el.style.transition = 'all 0.5s';
el.style.transform = 'scale(1.2)';
el.style.opacity = '0.5';
setTimeout(function() { el.style.transform = 'scale(1)'; el.style.opacity = '1'; }, 500);
}
function setupClickCounter() {
var btn = document.getElementById('click-btn');
var counter = document.getElementById('click-counter');
if (!btn || !counter) return;
var count = 0;
btn.addEventListener('click', function() { count++; counter.textContent = 'Кликов: ' + count; });
}
function setupInputDisplay() {
var input = document.getElementById('text-input');
var display = document.getElementById('input-display');
if (!input || !display) return;
input.addEventListener('input', function() { display.textContent = this.value; });
}
function setupKeyboardEvents() {
var input = document.getElementById('text-input');
if (!input) return;
input.addEventListener('keydown', function(e) { console.log('keydown:', e.key, e.code); });
input.addEventListener('keyup', function(e) { console.log('keyup:', e.key); });
}
function addListItem() {
var input = document.getElementById('item-input');
var list = document.getElementById('dynamic-list');
if (!input || !list || !input.value.trim()) return;
var li = document.createElement('li');
li.className = 'list-item';
li.textContent = input.value;
var btn = document.createElement('button');
btn.textContent = 'Удалить';
btn.addEventListener('click', function() { li.remove(); });
li.appendChild(btn);
list.appendChild(li);
input.value = '';
}
function clearList() {
var list = document.getElementById('dynamic-list');
if (list) list.innerHTML = '';
}
function setupListEvents() {
var addBtn = document.getElementById('add-item');
var clearBtn = document.getElementById('clear-list');
if (addBtn) addBtn.addEventListener('click', addListItem);
if (clearBtn) clearBtn.addEventListener('click', clearList);
}
function validateForm(formData) {
var errors = [];
if (!formData.name || formData.name.length < 2) errors.push('Имя: минимум 2 символа');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Email: некорректный формат');
var age = Number(formData.age);
if (!age || age < 1 || age > 120) errors.push('Возраст: от 1 до 120');
return errors;
}
function displayFormErrors(errors) {
var output = document.getElementById('form-output');
if (!output) return;
output.innerHTML = '';
var div = document.createElement('div');
div.className = 'error-message';
div.innerHTML = '<ul>' + errors.map(function(e){ return '<li>' + e + '</li>'; }).join('') + '</ul>';
output.appendChild(div);
}
function displayFormSuccess(userData) {
var output = document.getElementById('form-output');
if (!output) return;
output.innerHTML = '<div class="success-message">Пользователь: ' + userData.name + ', Email: ' + userData.email + ', Возраст: ' + userData.age + '</div>';
}
function handleFormSubmit(event) {
event.preventDefault();
var nameEl = document.getElementById('user-name');
var emailEl = document.getElementById('user-email');
var ageEl = document.getElementById('user-age');
var formData = {
name: nameEl ? nameEl.value : '',
email: emailEl ? emailEl.value : '',
age: ageEl ? ageEl.value : ''
};
var errors = validateForm(formData);
if (errors.length > 0) displayFormErrors(errors);
else displayFormSuccess(formData);
}
function setupForm() {
var form = document.getElementById('user-form');
if (form) form.addEventListener('submit', handleFormSubmit);
}
function initializeApp() {
setupStyleToggle();
setupClickCounter();
setupInputDisplay();
setupKeyboardEvents();
setupListEvents();
setupForm();
createCard('Пример карточки', 'Это содержимое карточки');
createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);
console.log('Приложение инициализировано!');
}
document.addEventListener('DOMContentLoaded', initializeApp);

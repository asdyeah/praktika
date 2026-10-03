document.addEventListener('DOMContentLoaded', function() {
var form = document.getElementById('registrationForm');
var inputs = form.querySelectorAll('input, select, textarea');
var bioTextarea = document.getElementById('bio');
var charCount = document.getElementById('charCount');
if (bioTextarea && charCount) {
bioTextarea.addEventListener('input', function() { charCount.textContent = this.value.length; });
}
inputs.forEach(function(input) {
input.addEventListener('blur', validateField);
input.addEventListener('input', clearError);
});
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');
if (password && confirmPassword) {
confirmPassword.addEventListener('input', validatePasswordMatch);
}
form.addEventListener('submit', function(e) {
e.preventDefault();
var isValid = true;
inputs.forEach(function(input) {
if (!validateField({ target: input })) isValid = false;
});
if (password && confirmPassword && !validatePasswordMatch()) isValid = false;
if (isValid) showSuccessMessage();
else alert('Исправьте ошибки в форме');
});
function validateField(e) {
var field = e.target;
if (!field.required && !field.value.trim()) { clearErrorForField(field); return true; }
if (!field.checkValidity()) { showErrorForField(field, getErrorMessage(field)); return false; }
clearErrorForField(field); return true;
}
function validatePasswordMatch() {
if (confirmPassword.value && password.value !== confirmPassword.value) {
showErrorForField(confirmPassword, 'Пароли не совпадают'); return false;
}
clearErrorForField(confirmPassword); return true;
}
function getErrorMessage(field) {
if (field.validity.valueMissing) return 'Это поле обязательно';
if (field.validity.typeMismatch && field.type === 'email') return 'Введите корректный email';
if (field.validity.tooShort) return 'Минимум ' + field.minLength + ' символов';
return 'Некорректное значение';
}
function showErrorForField(field, message) {
field.classList.add('error');
var el = document.getElementById(field.id + 'Error');
if (el) el.textContent = message;
}
function clearErrorForField(field) {
field.classList.remove('error');
var el = document.getElementById(field.id + 'Error');
if (el) el.textContent = '';
}
function clearError(e) { clearErrorForField(e.target); }
function showSuccessMessage() {
alert('Форма успешно отправлена!');
form.reset();
if (charCount) charCount.textContent = '0';
document.querySelectorAll('.error-message').forEach(function(el) { el.textContent = ''; });
document.querySelectorAll('.error').forEach(function(el) { el.classList.remove('error'); });
}
});

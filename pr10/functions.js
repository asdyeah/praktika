function sum() {
var total = 0;
for (var i = 0; i < arguments.length; i++) total += arguments[i];
return total;
}
function createUser(user) {
var email = user.email || 'не указан';
return 'Пользователь: ' + user.name + ', возраст: ' + user.age + ', email: ' + email;
}
function secretMessage(password, message) {
return function(inputPassword) {
return inputPassword === password ? message : 'Доступ запрещен';
};
}
function compose() {
var functions = Array.prototype.slice.call(arguments);
return function(x) {
var result = x;
for (var i = functions.length - 1; i >= 0; i--) result = functions[i](result);
return result;
};
}
function myMap(array, callback) {
var result = [];
for (var i = 0; i < array.length; i++) result.push(callback(array[i], i, array));
return result;
}
function myFilter(array, callback) {
var result = [];
for (var i = 0; i < array.length; i++) if (callback(array[i], i, array)) result.push(array[i]);
return result;
}
function myReduce(array, callback, initialValue) {
var acc = initialValue;
var startIndex = 0;
if (initialValue === undefined) { acc = array[0]; startIndex = 1; }
for (var i = startIndex; i < array.length; i++) acc = callback(acc, array[i], i, array);
return acc;
}
function curry(fn) {
return function curried() {
var args = Array.prototype.slice.call(arguments);
if (args.length >= fn.length) return fn.apply(this, args);
return function() {
var args2 = Array.prototype.slice.call(arguments);
return curried.apply(this, args.concat(args2));
};
};
}
function memoize(fn) {
var cache = new Map();
return function() {
var args = Array.prototype.slice.call(arguments);
var key = JSON.stringify(args);
if (cache.has(key)) return cache.get(key);
var result = fn.apply(this, args);
cache.set(key, result);
return result;
};
}
function debounce(fn, delay) {
var timeoutId;
return function() {
var args = Array.prototype.slice.call(arguments);
var ctx = this;
clearTimeout(timeoutId);
timeoutId = setTimeout(function() { fn.apply(ctx, args); }, delay);
};
}

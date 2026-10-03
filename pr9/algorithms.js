function isPrime(number) {
if (number <= 1) return false;
for (var i = 2; i <= Math.sqrt(number); i++) { if (number % i === 0) return false; }
return true;
}
function factorial(n) {
if (n < 0) return -1;
if (n === 0 || n === 1) return 1;
var r = 1;
for (var i = 2; i <= n; i++) r *= i;
return r;
}
function fibonacci(n) {
if (n <= 0) return [];
if (n === 1) return [0];
var result = [0, 1];
for (var i = 2; i < n; i++) result.push(result[i-1] + result[i-2]);
return result;
}
function gcd(a, b) {
while (b !== 0) { var t = b; b = a % b; a = t; }
return Math.abs(a);
}
function isPalindrome(str) {
var cleaned = str.toLowerCase().replace(/[^a-zа-яё]/g, '');
return cleaned === cleaned.split('').reverse().join('');
}
function countVowels(str) {
var vowels = 'аеёиоуыэюяaeiou';
var count = 0;
for (var i = 0; i < str.length; i++) { if (vowels.indexOf(str[i].toLowerCase()) !== -1) count++; }
return count;
}
function reverseString(str) {
var result = '';
for (var i = str.length - 1; i >= 0; i--) result += str[i];
return result;
}
function findLongestWord(sentence) {
var words = sentence.split(' ');
var longest = '';
for (var i = 0; i < words.length; i++) { if (words[i].length > longest.length) longest = words[i]; }
return longest;
}
function findMax(arr) {
if (arr.length === 0) return undefined;
var max = arr[0];
for (var i = 1; i < arr.length; i++) { if (arr[i] > max) max = arr[i]; }
return max;
}
function removeDuplicates(arr) {
var result = [];
for (var i = 0; i < arr.length; i++) { if (result.indexOf(arr[i]) === -1) result.push(arr[i]); }
return result;
}
function bubbleSort(arr) {
var sorted = arr.slice();
var n = sorted.length;
for (var i = 0; i < n - 1; i++) {
for (var j = 0; j < n - i - 1; j++) {
if (sorted[j] > sorted[j + 1]) { var t = sorted[j]; sorted[j] = sorted[j+1]; sorted[j+1] = t; }
}
}
return sorted;
}
function binarySearch(sortedArr, target) {
var left = 0, right = sortedArr.length - 1;
while (left <= right) {
var mid = Math.floor((left + right) / 2);
if (sortedArr[mid] === target) return mid;
if (sortedArr[mid] < target) left = mid + 1;
else right = mid - 1;
}
return -1;
}
function formatCurrency(amount, currency) {
if (currency === undefined) currency = 'RUB';
var formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
return formatted + ' ' + currency;
}
function isValidEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function generatePassword(length) {
if (length === undefined) length = 8;
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
var password = '';
for (var i = 0; i < length; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
return password;
}

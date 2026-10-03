function runTest(testName, actual, expected) {
var isEqual = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (isEqual ? 'success' : 'error');
el.innerHTML = '<strong>' + testName + ':</strong> ' + (isEqual ? 'OK' : 'FAIL') + ' | Ожидалось: ' + JSON.stringify(expected) + ' | Получено: ' + JSON.stringify(actual);
document.getElementById('testResults').appendChild(el);
console.log(testName, isEqual ? 'OK' : 'FAIL');
}
function runAllTests() {
runTest('isPrime(7)', isPrime(7), true);
runTest('isPrime(10)', isPrime(10), false);
runTest('factorial(5)', factorial(5), 120);
runTest('gcd(54,24)', gcd(54, 24), 6);
runTest('fibonacci(6)', fibonacci(6), [0, 1, 1, 2, 3, 5]);
runTest('isPalindrome', isPalindrome('А роза упала на лапу Азора'), true);
runTest('countVowels', countVowels('JavaScript'), 3);
runTest('reverseString', reverseString('hello'), 'olleh');
runTest('findLongestWord', findLongestWord('Самое длинное слово в предложении'), 'предложении');
runTest('findMax', findMax([3,7,2,9,1]), 9);
runTest('removeDuplicates', removeDuplicates([1,2,2,3,4,4,5]), [1,2,3,4,5]);
runTest('bubbleSort', bubbleSort([64,34,25,12,22,11,90]), [11,12,22,25,34,64,90]);
runTest('binarySearch', binarySearch([1,3,5,7,9], 5), 2);
runTest('isValidEmail', isValidEmail('test@example.com'), true);
}
document.addEventListener('DOMContentLoaded', runAllTests);

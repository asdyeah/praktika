function runTest(testName, actual, expected) {
var isEqual = JSON.stringify(actual) === JSON.stringify(expected);
var el = document.createElement('div');
el.className = 'test-result ' + (isEqual ? 'success' : 'error');
el.innerHTML = '<strong>' + testName + ':</strong> ' + (isEqual ? 'OK' : 'FAIL');
document.getElementById('testResults').appendChild(el);
}
function runAllTests() {
runTest('sum(1,2,3,4)', sum(1,2,3,4), 10);
runTest('sum()', sum(), 0);
runTest('createUser', createUser({name:'Иван', age:25}), 'Пользователь: Иван, возраст: 25, email: не указан');
runTest('secretMessage', secretMessage('123','Секрет')('123'), 'Секрет');
runTest('secretMessage wrong', secretMessage('123','Секрет')('000'), 'Доступ запрещен');
runTest('compose', compose(function(x){return x+1;}, function(x){return x*2;})(3), 7);
runTest('myMap', myMap([1,2,3], function(x){return x*2;}), [2,4,6]);
runTest('myFilter', myFilter([1,2,3,4], function(x){return x%2===0;}), [2,4]);
runTest('myReduce', myReduce([1,2,3,4], function(a,b){return a+b;}, 0), 10);
var add = function(a,b,c){return a+b+c;};
runTest('curry', curry(add)(1)(2)(3), 6);
var callCount = 0;
var memoTest = memoize(function(n){ callCount++; return n*2; });
memoTest(5); memoTest(5);
runTest('memoize кэширует', callCount, 1);
}
document.addEventListener('DOMContentLoaded', runAllTests);

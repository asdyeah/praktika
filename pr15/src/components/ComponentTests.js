import React from "react";

export function ComponentTests() {
    function runTests() {
        var testResults = [];

        try {
            var basicComponents = document.querySelectorAll("#basic-output-1 > *, #basic-output-2 > *");
            var statefulComponents = document.querySelectorAll("#stateful-output-1 > *, #stateful-output-2 > *");
            var hooksComponents = document.querySelectorAll("#hooks-output-1 > *, #hooks-output-2 > *");

            testResults.push({
                name: "Базовые компоненты созданы",
                passed: basicComponents.length > 0,
                message: "Найдено компонентов: " + basicComponents.length
            });
            testResults.push({
                name: "Компоненты с состоянием созданы",
                passed: statefulComponents.length > 0,
                message: "Найдено компонентов: " + statefulComponents.length
            });
            testResults.push({
                name: "Hooks компоненты созданы",
                passed: hooksComponents.length > 0,
                message: "Найдено компонентов: " + hooksComponents.length
            });
        } catch (error) {
            testResults.push({
                name: "Общие тесты",
                passed: false,
                message: "Ошибка: " + error.message
            });
        }

        console.log("=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ===");
        testResults.forEach(function (test) {
            console.log((test.passed ? "✅" : "❌") + " " + test.name + ": " + test.message);
        });

        var passedTests = testResults.filter(function (t) { return t.passed; }).length;
        var totalTests = testResults.length;
        alert("Тестирование завершено: " + passedTests + "/" + totalTests + " тестов пройдено");
    }

    return (
        <section className="task-section">
            <h2>Тестирование компонентов</h2>
            <div className="component-demo">
                <button onClick={runTests} style={{ padding: "1rem", cursor: "pointer" }}>
                    Запустить тесты компонентов
                </button>
                <div style={{ marginTop: "2rem", textAlign: "left" }}>
                    <h3>Инструкция по проверке:</h3>
                    <ul>
                        <li>Убедитесь, что все компоненты отображаются корректно</li>
                        <li>Проверьте работу счётчиков и форм</li>
                        <li>Убедитесь, что обработчики событий работают</li>
                        <li>Проверьте работу хуков и жизненного цикла</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
export default ComponentTests;
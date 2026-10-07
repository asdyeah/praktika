import React, { useState, useEffect, useCallback, useContext, createContext } from "react";

// ЗАДАНИЕ 6.1: CounterWithHooks
function CounterWithHooks() {
    var [count, setCount] = useState(0);
    return (
        <div className="user-card">
            <div className="counter">{count}</div>
            <button onClick={function () { setCount(count + 1); }}>+1</button>
            <button onClick={function () { setCount(count - 1); }}>-1</button>
            <button onClick={function () { setCount(0); }}>Сброс</button>
        </div>
    );
}

// ЗАДАНИЕ 6.2: UserProfile
function UserProfile() {
    var [user, setUser] = useState({ name: "Анна", email: "anna@example.com", age: 25 });
    var [isEditing, setIsEditing] = useState(false);
    var [temp, setTemp] = useState(user);
    function save() {
        setUser(temp);
        setIsEditing(false);
    }
    if (isEditing) {
        return (
            <div className="user-card">
                <h4>Редактирование профиля</h4>
                <input value={temp.name} onChange={function (e) { setTemp({ ...temp, name: e.target.value }); }} style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                <input value={temp.email} onChange={function (e) { setTemp({ ...temp, email: e.target.value }); }} style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                <input type="number" value={temp.age} onChange={function (e) { setTemp({ ...temp, age: Number(e.target.value) }); }} style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                <button onClick={save}>Сохранить</button>
                <button onClick={function () { setIsEditing(false); }}>Отмена</button>
            </div>
        );
    }
    return (
        <div className="user-card">
            <h4>{user.name}</h4>
            <p>Email: {user.email}</p>
            <p>Возраст: {user.age}</p>
            <button onClick={function () { setTemp(user); setIsEditing(true); }}>Редактировать</button>
        </div>
    );
}

// ЗАДАНИЕ 6.3: EffectDemo
function EffectDemo() {
    var [count, setCount] = useState(0);
    var [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(function () {
        console.log("EffectDemo: монтирование (только один раз)");
    }, []);

    useEffect(function () {
        console.log("EffectDemo: count изменился → " + count);
    }, [count]);

    useEffect(function () {
        var timer = setInterval(function () {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return function () { clearInterval(timer); };
    }, []);

    return (
        <div className="user-card">
            <h4>useEffect демонстрация</h4>
            <p>Счётчик: {count}</p>
            <button onClick={function () { setCount(count + 1); }}>Увеличить</button>
            <p>Время: {time}</p>
        </div>
    );
}

// ЗАДАНИЕ 7.1: useLocalStorage
function useLocalStorage(key, initialValue) {
    var [storedValue, setStoredValue] = useState(function () {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    var setValue = useCallback(function (value) {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) { console.error(error); }
    }, [key]);
    return [storedValue, setValue];
}

// ЗАДАНИЕ 7.2: useFetch
function useFetch(url) {
    var [data, setData] = useState(null);
    var [loading, setLoading] = useState(true);
    var [error, setError] = useState(null);
    useEffect(function () {
        var cancelled = false;
        setLoading(true);
        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (d) { if (!cancelled) { setData(d); setLoading(false); } })
            .catch(function (e) { if (!cancelled) { setError(e.message); setLoading(false); } });
        return function () { cancelled = true; };
    }, [url]);
    return { data: data, loading: loading, error: error };
}

// ЗАДАНИЕ 7.3: ThemeContext + ThemeToggle
var ThemeContext = createContext();

function ThemeProvider(props) {
    var [theme, setTheme] = useLocalStorage("theme", "light");
    var value = { theme: theme, toggleTheme: function () { setTheme(theme === "light" ? "dark" : "light"); } };
    return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

function ThemeToggle() {
    var { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="user-card" style={{
            background: theme === "dark" ? "#2c3e50" : "#ecf0f1",
            color: theme === "dark" ? "white" : "black"
        }}>
            <h4>Тема: {theme}</h4>
            <button onClick={toggleTheme}>Переключить тему</button>
        </div>
    );
}

function HooksComponents() {
    return (
        <section className="task-section">
            <h2>React Hooks</h2>
            <div className="component-demo">
                <h3>Задание 6: useState и useEffect</h3>
                <div id="hooks-output-1" className="output">
                    <CounterWithHooks />
                    <UserProfile />
                    <EffectDemo />
                </div>
            </div>
            <div className="component-demo">
                <h3>Задание 7: Кастомные хуки и Context</h3>
                <div id="hooks-output-2" className="output">
                    <ThemeProvider>
                        <ThemeToggle />
                    </ThemeProvider>
                </div>
            </div>
        </section>
    );
}
export default HooksComponents;
import React, { Component } from "react";

// ЗАДАНИЕ 3.1: Counter
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: props.initialValue || 0 };
    }
    increment = () => { this.setState({ count: this.state.count + 1 }); };
    decrement = () => { this.setState({ count: this.state.count - 1 }); };
    reset = () => { this.setState({ count: 0 }); };
    render() {
        return (
            <div className="user-card">
                <div className="counter">{this.state.count}</div>
                <button onClick={this.increment}>+1</button>
                <button onClick={this.decrement}>-1</button>
                <button onClick={this.reset}>Сброс</button>
            </div>
        );
    }
}

// ЗАДАНИЕ 3.2: LoginForm
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", errors: [] };
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        var errors = [];
        if (!this.state.email.includes("@")) errors.push("Некорректный email");
        if (this.state.password.length < 6) errors.push("Пароль минимум 6 символов");
        if (errors.length === 0) errors.push("Успешный вход!");
        this.setState({ errors: errors });
    };
    render() {
        return (
            <form className="user-card" onSubmit={this.handleSubmit}>
                <h4>Вход</h4>
                <input name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }} />
                <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }} />
                <button type="submit">Войти</button>
                <ul>{this.state.errors.map(function (err, i) { return <li key={i}>{err}</li>; })}</ul>
            </form>
        );
    }
}

// ЗАДАНИЕ 3.3: ColorPicker
class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: props.colors[0] || "#3498db" };
    }
    render() {
        var self = this;
        return (
            <div className="user-card">
                <h4>Выбор цвета</h4>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {this.props.colors.map(function (color) {
                        return (
                            <div key={color}
                                onClick={function () { self.setState({ selected: color }); }}
                                style={{
                                    width: 50, height: 50, borderRadius: 8,
                                    background: color, cursor: "pointer",
                                    border: self.state.selected === color ? "3px solid black" : "1px solid #ccc"
                                }} />
                        );
                    })}
                </div>
                <p>Выбран: <span style={{ color: self.state.selected }}>{self.state.selected}</span></p>
                <div style={{ width: "100%", height: 60, background: self.state.selected, borderRadius: 8, marginTop: "0.5rem" }} />
            </div>
        );
    }
}

// ЗАДАНИЕ 4.1: TodoList
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [], input: "" };
    }
    handleChange = (e) => { this.setState({ input: e.target.value }); };
    addTodo = () => {
        if (!this.state.input.trim()) return;
        this.setState({
            todos: this.state.todos.concat({ text: this.state.input, done: false }),
            input: ""
        });
    };
    toggleTodo = (index) => {
        var todos = this.state.todos.slice();
        todos[index].done = !todos[index].done;
        this.setState({ todos: todos });
    };
    removeTodo = (index) => {
        var todos = this.state.todos.slice();
        todos.splice(index, 1);
        this.setState({ todos: todos });
    };
    render() {
        var self = this;
        return (
            <div className="user-card">
                <h4>Список задач</h4>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input value={this.state.input} onChange={this.handleChange} placeholder="Новая задача" style={{ flex: 1, padding: "0.5rem" }} />
                    <button onClick={this.addTodo}>Добавить</button>
                </div>
                <ul style={{ listStyle: "none", marginTop: "1rem" }}>
                    {this.state.todos.map(function (todo, i) {
                        return (
                            <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                                <span onClick={function () { self.toggleTodo(i); }}
                                    style={{ textDecoration: todo.done ? "line-through" : "none", cursor: "pointer", flex: 1 }}>
                                    {todo.text}
                                </span>
                                <button onClick={function () { self.removeTodo(i); }}>×</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

// ЗАДАНИЕ 4.2: SearchBox
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = { query: "" };
    }
    handleChange = (e) => { this.setState({ query: e.target.value }); };
    clear = () => { this.setState({ query: "" }); };
    render() {
        var self = this;
        var filtered = this.props.items.filter(function (item) {
            return item.toLowerCase().includes(self.state.query.toLowerCase());
        });
        return (
            <div className="user-card">
                <h4>Поиск</h4>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input value={this.state.query} onChange={this.handleChange} placeholder="Введите запрос..." style={{ flex: 1, padding: "0.5rem" }} />
                    <button onClick={this.clear}>Очистить</button>
                </div>
                <ul style={{ marginTop: "1rem" }}>
                    {filtered.map(function (item, i) { return <li key={i}>{item}</li>; })}
                </ul>
            </div>
        );
    }
}

class StatefulComponents extends Component {
    render() {
        return (
            <section className="task-section">
                <h2>Компоненты с состоянием</h2>
                <div className="component-demo">
                    <h3>Задание 3: Классовые компоненты</h3>
                    <div id="stateful-output-1" className="output">
                        <Counter initialValue={0} />
                        <LoginForm />
                        <ColorPicker colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00"]} />
                    </div>
                </div>
                <div className="component-demo">
                    <h3>Задание 4: Обработка событий</h3>
                    <div id="stateful-output-2" className="output">
                        <TodoList />
                        <SearchBox items={["React", "JavaScript", "HTML", "CSS", "Node.js"]} />
                    </div>
                </div>
            </section>
        );
    }
}
export default StatefulComponents;
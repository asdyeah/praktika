import React, { Component } from "react";

// ЗАДАНИЕ 5.1: Timer
class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0, isRunning: false };
    }
    componentDidMount() {
        console.log("Timer: componentDidMount");
    }
    componentWillUnmount() {
        console.log("Timer: componentWillUnmount");
        if (this.interval) clearInterval(this.interval);
    }
    start = () => {
        if (this.state.isRunning) return;
        this.setState({ isRunning: true });
        this.interval = setInterval(() => {
            this.setState({ seconds: this.state.seconds + 1 });
        }, 1000);
    };
    stop = () => {
        clearInterval(this.interval);
        this.setState({ isRunning: false });
    };
    reset = () => {
        clearInterval(this.interval);
        this.setState({ seconds: 0, isRunning: false });
    };
    render() {
        return (
            <div className="user-card">
                <h4>Таймер</h4>
                <div className="counter">{this.state.seconds} сек</div>
                <button onClick={this.start} disabled={this.state.isRunning}>Старт</button>
                <button onClick={this.stop}>Стоп</button>
                <button onClick={this.reset}>Сброс</button>
            </div>
        );
    }
}

// ЗАДАНИЕ 5.2: WindowSizeTracker
class WindowSizeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth, height: window.innerHeight };
    }
    handleResize = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        console.log("WindowSizeTracker: слушатель добавлен");
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        console.log("WindowSizeTracker: слушатель удалён");
    }
    render() {
        return (
            <div className="user-card">
                <h4>Размер окна</h4>
                <p>Ширина: {this.state.width}px</p>
                <p>Высота: {this.state.height}px</p>
            </div>
        );
    }
}

// ЗАДАНИЕ 5.3: DataFetcher
class DataFetcher extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null, loading: false, error: null };
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url) {
            this.fetchData();
        }
    }
    fetchData = async () => {
        this.setState({ loading: true, error: null });
        try {
            var response = await fetch(this.props.url);
            var data = await response.json();
            this.setState({ data: data, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };
    render() {
        if (this.state.loading) return <div className="user-card">Загрузка...</div>;
        if (this.state.error) return <div className="user-card" style={{ color: "red" }}>Ошибка: {this.state.error}</div>;
        if (!this.state.data) return null;
        var items = Array.isArray(this.state.data) ? this.state.data.slice(0, 3) : [this.state.data];
        return (
            <div className="user-card">
                <h4>Данные с API</h4>
                {items.map(function (item, i) {
                    return <p key={i}>{item.name || item.title || JSON.stringify(item)}</p>;
                })}
            </div>
        );
    }
}

class LifecycleComponents extends Component {
    render() {
        return (
            <section className="task-section">
                <h2>Жизненный цикл компонентов</h2>
                <div className="component-demo">
                    <h3>Задание 5: Методы жизненного цикла</h3>
                    <div id="lifecycle-output" className="output">
                        <Timer />
                        <WindowSizeTracker />
                        <DataFetcher url="https://jsonplaceholder.typicode.com/users" />
                    </div>
                </div>
            </section>
        );
    }
}
export default LifecycleComponents;
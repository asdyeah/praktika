import React from "react";

// ЗАДАНИЕ 1.1: WelcomeMessage
export function WelcomeMessage(props) {
    return (
        <div className="user-card">
            <h4>Привет, {props.name}!</h4>
            <p>Тебе {props.age} лет</p>
        </div>
    );
}

// ЗАДАНИЕ 1.2: UserCard
export function UserCard(props) {
    var user = props.user;
    return (
        <div className="user-card">
            <img src={user.avatar} alt={user.name} style={{ width: 60, height: 60, borderRadius: "50%" }} />
            <h4>{user.name}</h4>
            <p>Email: {user.email}</p>
            <p style={{ color: user.isOnline ? "green" : "red" }}>
                {user.isOnline ? "● Онлайн" : "○ Оффлайн"}
            </p>
        </div>
    );
}

// ЗАДАНИЕ 1.3: Button
export function Button(props) {
    var variant = props.variant || "primary";
    var size = props.size || "medium";
    var className = "btn btn-" + variant + " btn-" + size;
    return (
        <button className={className} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

// ЗАДАНИЕ 2.1: Card
export function Card(props) {
    return (
        <div className="user-card">
            {props.title && <h3>{props.title}</h3>}
            <div>{props.children}</div>
        </div>
    );
}

// ЗАДАНИЕ 2.2: Toggle
export function Toggle(props) {
    var [isVisible, setIsVisible] = React.useState(false);
    return (
        <div>
            <button onClick={function () { setIsVisible(!isVisible); }}>
                {props.buttonText || "Показать/скрыть"}
            </button>
            {isVisible && <div style={{ marginTop: "0.5rem" }}>{props.children}</div>}
        </div>
    );
}

// ЗАДАНИЕ 2.3: ConditionalMessage
export function ConditionalMessage(props) {
    var messages = {
        success: "✅ Операция выполнена успешно!",
        error: "❌ Произошла ошибка",
        warning: "⚠️ Внимание!"
    };
    var colors = { success: "green", error: "red", warning: "orange" };
    return (
        <div style={{ color: colors[props.status] || "gray", fontWeight: "bold" }}>
            {messages[props.status] || "Неизвестный статус"}
        </div>
    );
}

function BasicComponents() {
    var userData = {
        name: "Анна Иванова",
        email: "anna@example.com",
        avatar: "https://i.pravatar.cc/100",
        isOnline: true
    };
    return (
        <section className="task-section">
            <h2>Базовые компоненты</h2>
            <div className="component-demo">
                <h3>Задание 1: Компоненты с props</h3>
                <div id="basic-output-1" className="output">
                    <WelcomeMessage name="Иван" age={25} />
                    <UserCard user={userData} />
                    <Button variant="primary" onClick={function () { alert("Клик!"); }}>
                        Нажми меня
                    </Button>
                </div>
            </div>
            <div className="component-demo">
                <h3>Задание 2: Children и условный рендеринг</h3>
                <div id="basic-output-2" className="output">
                    <Card title="Пример карточки">
                        <p>Это содержимое карточки</p>
                    </Card>
                    <Toggle buttonText="Показать/скрыть">
                        <p>Секретный контент!</p>
                    </Toggle>
                    <ConditionalMessage status="success" />
                    <ConditionalMessage status="error" />
                    <ConditionalMessage status="warning" />
                </div>
            </div>
        </section>
    );
}
export default BasicComponents;
import React, { useState, useEffect, useRef, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  }, [count]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Демонстрация хуков React</h1>
      
      <h2>useState</h2>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>

      <h2>useReducer</h2>
      <p>Счетчик: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>

      <h2>useRef</h2>
      <input ref={inputRef} placeholder="Нажми кнопку, чтобы сфокусироваться" />
      <button onClick={focusInput}>Фокус</button>
    </div>
  );
}

export default App;

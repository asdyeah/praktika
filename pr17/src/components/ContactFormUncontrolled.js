import React, { useRef } from 'react';

const ContactFormUncontrolled = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Неуправляемая форма</h2>
      <input type="text" ref={nameRef} placeholder="Имя" />
      <input type="email" ref={emailRef} placeholder="Email" />
      <textarea ref={messageRef} placeholder="Сообщение" />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactFormUncontrolled;

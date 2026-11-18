import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ПР 17: Формы в React</h1>
      <UserRegistrationForm />
      <hr />
      <UserRegistrationFormWithValidation />
      <hr />
      <ContactFormUncontrolled />
    </div>
  );
}

export default App;

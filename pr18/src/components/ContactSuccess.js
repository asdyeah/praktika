import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const { message, formData } = location.state || {};

  return (
    <div>
      <h2>Успех!</h2>
      {message ? (
        <div style={{ border: '1px solid green', padding: '20px', backgroundColor: '#f0fff0' }}>
          <p style={{ color: 'green' }}>{message}</p>
          {formData && (
            <div style={{ marginTop: '20px' }}>
              <h4>Отправленные данные:</h4>
              <p><strong>Имя:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Тема:</strong> {formData.subject}</p>
              <p><strong>Сообщение:</strong> {formData.message}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Нет данных.</p>
      )}
      <Link to="/">На главную</Link>
    </div>
  );
};

export default ContactSuccess;

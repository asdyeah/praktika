import React, { useState } from 'react';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    gender: '', subscribe: false, age: '', about: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Имя" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Подтверждение пароля" />
      <div>
        <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Женский</label>
      </div>
      <div>
        <label><input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleChange} /> Подписка на рассылку</label>
      </div>
      <select name="age" value={formData.age} onChange={handleChange}>
        <option value="">Возраст</option>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36+">36+</option>
      </select>
      <textarea name="about" value={formData.about} onChange={handleChange} placeholder="О себе" />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default UserRegistrationForm;

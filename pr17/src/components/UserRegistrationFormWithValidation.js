import React, { useState } from 'react';

const UserRegistrationFormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    gender: '', subscribe: false, age: '', about: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Имя обязательно';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Пароль минимум 8 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.about) newErrors.about = 'Поле обязательно';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Успех', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация с валидацией</h2>
      <div>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Имя" />
        {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
      </div>
      <div>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      <div>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
        {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      </div>
      <div>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Подтверждение" />
        {errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
      </div>
      <div>
        <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Женский</label>
        {errors.gender && <span style={{color: 'red'}}>{errors.gender}</span>}
      </div>
      <div>
        <label><input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleChange} /> Подписка</label>
      </div>
      <div>
        <select name="age" value={formData.age} onChange={handleChange}>
          <option value="">Возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36+">36+</option>
        </select>
        {errors.age && <span style={{color: 'red'}}>{errors.age}</span>}
      </div>
      <div>
        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="О себе" />
        {errors.about && <span style={{color: 'red'}}>{errors.about}</span>}
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default UserRegistrationFormWithValidation;

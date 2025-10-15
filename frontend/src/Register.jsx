import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Validation from './RegisterValidation';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data: values })
        });

        if (!response.ok) {
          throw new Error("Failed to register user");
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        alert("User registered successfully!");
        navigate('/'); // Redirect to login page
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Failed to register. Please check backend connection.");
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vw-100 vh-100 bg-success'>
      <div className='bg-white p-3 rounded vw-25'>
        <h2>Register</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='pb-2'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type='text'
              name='name'
              value={values.name}
              placeholder='Enter your name'
              onChange={handleInput}
              className='form-control rounded-0 p-1'
              required
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

          <div className='pb-2'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              name='email'
              value={values.email}
              placeholder='Enter your email'
              onChange={handleInput}
              className='form-control rounded-0 p-1'
              required
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className='pb-2'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              name='password'
              value={values.password}
              placeholder='Enter your password'
              onChange={handleInput}
              className='form-control rounded-0 p-1'
              required
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-primary w-100 rounded-2 mt-2'>Register</button>
          <div className='text-center'>
            <p className='mt-3'>
              Already have an account? <Link to='/'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

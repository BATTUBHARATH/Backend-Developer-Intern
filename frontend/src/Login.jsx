import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const ValidationErrors = Validation(values);
        setErrors(ValidationErrors)

        if (ValidationErrors.email === "" && ValidationErrors.password === "") {
            axios.get("http://localhost:3000/login", { data: values })
                .then(res => {
                    console.log("Login successful:", res.data);
                    alert("Login successful!");
                    navigate('/home')
                })
                .catch(err => {
                    console.error("Login Error:", err);
                    alert("Login failed. Please check your credentials and backend connection.");

                })

        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vw-100 vh-100 bg-success'>
            <div className='bg-white p-3 rounded vw-25'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='pb-2'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={values.email}
                            placeholder='Enter your email'
                            onChange={handleInput}
                            className='form-control rounded-0 p-1'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='pb-2'>
                        <label htmlFor='password'><
                            strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={values.password}
                            placeholder='Enter your password'
                            onChange={handleInput}
                            className='form-control rounded-0 p-1' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-primary w-100 rounded-2 mt-2'>Login</button>
                    <p className="mt-3">If you are not having account</p>
                    <Link to='/register' className='btn btn-primary w-100 rounded-2 m-1 text-white'>Register</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;

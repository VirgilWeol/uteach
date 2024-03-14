import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/authactions';

export default function PageRegister() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    age: '',
    password: ''
  });
  const [msg, setMsg] = useState(null);

  const error = useSelector((state) => state.error);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, name, phone, age, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (error) {
      if (error.id === 'REGISTER_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuth) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuth]);

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const newUser = { email, name, phone, age, password };
      dispatch(register(newUser));
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  return (
    <div className='w-full h-screen bg-slate-100'>
      <form className='absolute flex items-center justify-center w-5/6 p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2 lg:w-2/4 xl:w-1/4'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1 className='mb-4 text-4xl font-bold text-slate-800'>Register</h1>
          <p>
            Have an account?{' '}
            <Link to='/login' className='text-blue-500'>
              Login
            </Link>
          </p>
          <div className='flex flex-col w-full'>
            <label htmlFor='email' className='text-slate-500'>
              Email
            </label>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter email address'
              className='p-2 mb-4 border rounded-sm border-slate-200'
              onChange={onChange}
            />
            <label htmlFor='name' className='text-slate-500'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter full name'
              className='p-2 mb-4 border rounded-sm border-slate-200'
              onChange={onChange}
            />
            <label htmlFor='phone' className='text-slate-500'>
              Phone Number
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              placeholder='Enter phone number'
              className='p-2 mb-4 border rounded-sm border-slate-200'
              onChange={onChange}
            />
            <label htmlFor='age' className='text-slate-500'>
              Age
            </label>
            <input
              type='text'
              id='age'
              name='age'
              placeholder='Enter age'
              className='p-2 mb-4 border rounded-sm border-slate-200'
              onChange={onChange}
            />
            <label htmlFor='password' className='text-slate-500'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter password'
              className='p-2 mb-4 border rounded-sm border-slate-200'
              onChange={onChange}
            />
            {msg && <p className='text-red-500'>{msg}</p>}

            <button
              type='submit'
              className='p-2 text-white bg-blue-500 rounded-md'
              onClick={onSubmit}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

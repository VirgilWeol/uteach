import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/authactions';
import { clearErrors } from '../../actions/erroractions';
import PropTypes from 'prop-types';

function PageLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const error = useSelector((state) => state.error);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // Check if there's an error
      if (error.id === 'LOGIN_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuth) {
      clearErrors();
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuth]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      dispatch(login(user));
    } catch (err) {
      setMsg(err.response.data.msg); // Handle errors from the backend
    }
  };

  return (
    <div className='w-full h-screen bg-slate-100'>
      <form
        onSubmit={onSubmit}
        className='absolute flex items-center justify-center w-5/6 p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2 lg:w-2/4 xl:w-1/4'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1 className='mb-4 text-4xl font-bold text-slate-800'>Login</h1>
          <p>
            New to this website?{' '}
            <Link to='/register' className='text-blue-500'>
              Register
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email address'
              className='p-2 mb-4 border rounded-sm border-slate-200'
            />

            <label htmlFor='password' className='text-slate-500'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              className='p-2 mb-4 border rounded-sm border-slate-200'
            />
            {msg && <p className='text-red-500'>{msg}</p>}

            <button
              type='submit'
              className='p-2 text-white bg-blue-500 rounded-md'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

PageLogin.propTypes = {
  isAuth: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(PageLogin);

import React, { useState } from 'react';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiAcademicCap,
  HiArrowRightOnRectangle,
  HiBars3
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { changeRole, logout } from '../actions/authactions';

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMentorMode = () => {
    // if (auth.user.role === 'mentor') {
    //   if (auth.user.activeRole === 'user') {
    //     dispatch(changeRole('mentor'));
    //     navigate('/history');
    //     console.log('mentor mode');
    //     return;
    //   }
    //   if (auth.user.activeRole === 'mentor') {
    //     dispatch(changeRole('user'));
    //     navigate('/');
    //     console.log('user mode');
    //     return;
    //   }
    // }
    navigate('/request-mentor');
    if (auth.user.role === 'user') {
      return;
    }
  };

  const handleMentorButton = () => {
    if (auth.user.role === 'mentor') {
      if (auth.user.activeRole === 'user') return 'Mentor Mode';
      return 'Student Mode';
    }
    if (auth.user.role === 'user') {
      return 'Request Mentor';
    }
  };

  return (
    <div
      className={`relative bg-white shadow-md ${
        auth.user.activeRole === 'mentor' && 'border-b-4 border-blue-500'
      }`}>
      <div className='px-4 mx-auto lg:container'>
        <div className='flex items-center justify-between p-2'>
          <div>
            <img src={logo} alt='logo' className='w-32 sm:w-40' />
          </div>
          <div className='items-center justify-center hidden gap-3 lg:flex'>
            <ul className='flex items-center m-0 space-x-4 '>
              <li>
                <Link to='/' className='font-medium text-slate-800'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/history' className='font-medium text-slate-800'>
                  Contract History
                </Link>
              </li>
            </ul>
            <button
              className='flex items-center justify-center gap-1 px-4 py-2 font-medium text-white bg-blue-500 rounded-md'
              onClick={() => handleMentorMode()}>
              <HiAcademicCap />
              {handleMentorButton()}
            </button>
            <div className='w-8 h-8'>
              <img
                src={avatar}
                alt=''
                className='rounded-full'
                onClick={() => navigate(`/profile/${auth.user._id}`)}
              />
            </div>
            <div>
              <span>
                {auth.user ? (
                  <span className='text-sm font-medium'>{`Welcome, ${auth.user.name}`}</span>
                ) : (
                  ''
                )}
              </span>
            </div>
            <button onClick={handleLogout}>
              <HiArrowRightOnRectangle className='text-2xl text-red-500' />
            </button>
          </div>

          <button className='block lg:hidden' onClick={toggleMenu}>
            <HiBars3 className='text-3xl' />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className='absolute block w-full bg-white lg:hidden'>
          <ul className='flex flex-col items-center gap-4'>
            <li>
              <Link to='/' className='font-medium text-slate-800'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/history' className='font-medium text-slate-800'>
                Contract History
              </Link>
            </li>
            <li>
              <button className='flex items-center justify-center gap-1 px-4 py-2 font-medium text-white bg-blue-500 rounded-md'>
                <HiAcademicCap />
                Mentor Mode
              </button>
            </li>
            <li>
              <div className='w-8 h-8'>
                <img src={avatar} alt='' className='rounded-full' />
              </div>
            </li>
            <li>
              <span>
                {auth.user ? (
                  <span className='text-sm font-medium'>{`Welcome, ${auth.user.name}`}</span>
                ) : (
                  ''
                )}
              </span>
            </li>
            <li>
              <button onClick={handleLogout}>
                <HiArrowRightOnRectangle className='text-2xl text-red-500' />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;

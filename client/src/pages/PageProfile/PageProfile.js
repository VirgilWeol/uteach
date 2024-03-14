import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../actions/authactions';
import avatar from '../../assets/avatarBig.png';

export default function PageProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    about: ''
  });

  const { name, phone, age, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const data = {
      _id: user._id,
      name,
      phone,
      age,
      about
    };

    dispatch(editProfile(data));
  };

  console.log('user', user);

  return (
    <div className='container p-4 mx-auto'>
      <div className='p-4 bg-white rounded-md'>
        <h1 className='text-3xl font-bold'>Profile</h1>
        <div className='flex flex-col items-center justify-center gap-2'>
          <img src={avatar} alt='avatar' className='w-40 h-40 rounded-full' />
          <div className='w-full'>
            <div className='mb-2'>
              <label htmlFor='name' className='p-0 m-0 text-slate-500'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Full Name'
                className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
                defaultValue={user.name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='phone' className='p-0 m-0 text-slate-500'>
                Phone Number
              </label>
              <input
                type='text'
                id='phone'
                name='phone'
                placeholder='Phone Number'
                className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
                defaultValue={user.phone}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='age' className='p-0 m-0 text-slate-500'>
                Age
              </label>
              <input
                type='number'
                id='age'
                name='age'
                placeholder='Age'
                className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
                defaultValue={user.age}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='about' className='p-0 m-0 text-slate-500'>
                About
              </label>
              <textarea
                type='text'
                id='about'
                name='about'
                placeholder='About'
                className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
                defaultValue={user.about}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='flex justify-end w-full'>
              <button
                className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500'
                onClick={() => window.history.back()}>
                Cancel
              </button>
              <button
                className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md'
                onClick={() => onSubmit()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

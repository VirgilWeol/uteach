import React, { useEffect, useRef, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import avatar from '../../../assets/avatarBig.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../../../actions/userActions';
import { editProfile } from '../../../actions/authactions';

export default function PageManageUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const editModalRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    age: '',
    about: ''
  });

  const { name, phone, age, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onSubmit = (id) => {
    const data = {
      _id: id,
      name,
      phone,
      age,
      about
    };

    dispatch(editProfile(data));

    dispatch(getUser());
    editModalRef.current.close();
  };

  useEffect(() => {
    if (search && users.length > 0) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  if (users.length === 0) {
    return <h1>No Users</h1>;
  }

  return (
    <>
      <dialog
        ref={editModalRef}
        className='fixed inset-0 z-10 overflow-y-hidden bg-transparent'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold'>Edit User</h1>
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
                  defaultValue={name}
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
                  defaultValue={phone}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='age' className='p-0 m-0 text-slate-500'>
                  Age
                </label>
                <input
                  type='text'
                  id='age'
                  name='age'
                  placeholder='Age'
                  className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
                  defaultValue={age}
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
                  defaultValue={about}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='flex items-center justify-between gap-4'>
                <button
                  className='px-8 py-2 text-white bg-blue-500 rounded-md'
                  onClick={() => onSubmit(formData.id)}>
                  Save
                </button>
                <button
                  onClick={() => editModalRef.current.close()}
                  className='px-8 py-2 text-white bg-red-500 rounded-md'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <div className='container p-4 mx-auto'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center w-full gap-2 px-2 bg-transparent border rounded-md border-slate-200'>
            <HiMiniMagnifyingGlass />
            <input
              type='text'
              placeholder='Search...'
              className='w-full p-2 bg-transparent rounded-md active:outline-none focus:outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* List of Users(Editable, Deletable) */}
        <div className='flex flex-col gap-2'>
          {/* Name, Age, Address, About, Role, Email, Phone,  */}
          {filteredUsers &&
            filteredUsers.map((user, i) => (
              <div
                key={i}
                className='flex items-center justify-between p-2 bg-white rounded-md'>
                <div className='flex items-center justify-center gap-2'>
                  <img
                    src={avatar}
                    alt='avatar'
                    className='h-12 rounded-full'
                  />
                  <div className='flex flex-col justify-center'>
                    <h1 className='m-0 text-lg font-semibold leading-none'>
                      {user.name}
                    </h1>
                    <p className='m-0 text-sm'>{user.role}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    className='px-8 py-2 text-white bg-blue-500 rounded-md'
                    onClick={() => {
                      editModalRef.current.showModal();
                      setFormData({
                        id: user._id,
                        name: user.name,
                        phone: user.phone,
                        age: user.age,
                        about: user.about
                      });
                    }}>
                    Edit
                  </button>
                  <button
                    className='px-8 py-2 text-white bg-red-500 rounded-md'
                    onClick={() => dispatch(deleteUser(user._id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { HiAcademicCap, HiMiniPhone } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../actions/itemActions';
import { useNavigate, useParams } from 'react-router-dom';
import { addOrder } from '../../actions/orderActions';

export default function PageCheckout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: '',
    contract: '',
    description: ''
  });
  const { price, contract, description } = formData;
  const { subjectName, itemId } = useParams();

  useEffect(() => {
    dispatch(getItem());
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log('items', items);
  console.log('user', user);

  const onSubmit = () => {
    const data = {
      itemId,
      studentId: user._id,
      mentorId: items.items.find((item) => item._id === itemId).mentorId,
      subject: subjectName,
      price,
      contract,
      description
    };

    console.log('data', data);

    dispatch(addOrder(data));
  };

  return (
    <div className='container p-4 mx-auto'>
      <div className='p-4 bg-white rounded-md'>
        <div className='flex flex-col items-start justify-between md:flex-row'>
          <h1 className='text-3xl font-bold'>{subjectName}</h1>
          <div className='flex items-center gap-2'>
            <HiAcademicCap />
            <span className='font-medium text-slate-500'>
              {items.mentorName}
            </span>
          </div>
        </div>
        <div>
          <h2 className='m-0 mt-4 text-sm font-bold leading-none text-dark'>
            Description
          </h2>
          <p className='text-slate-500'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, eaque minima corporis possimus at quia!
          </p>
        </div>
        <div className='mb-2'>
          <label htmlFor='price' className='text-slate-500'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='contract' className='text-slate-500'>
            Contract Length (Hours)
          </label>
          <input
            type='number'
            id='contract'
            name='contract'
            placeholder='Contract'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='description' className='text-slate-500'>
            Description
          </label>
          <textarea
            type='text'
            id='description'
            name='description'
            placeholder='Description'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            onChange={(e) => onChange(e)}
          />
        </div>
        <p>For more detailed information contact the phone number below</p>
        <div className='flex items-center gap-2'>
          <HiMiniPhone />
          <span className='text-slate-500'>+6281278276034</span>
        </div>
        <div className='flex justify-end gap-2'>
          <button
            className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500 '
            onClick={() => window.history.back()}>
            Cancel
          </button>
          <button
            className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
            onClick={() => onSubmit()}>
            Offer
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { HiClock, HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByStudentId } from '../../actions/orderActions';

export default function PageHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrderByStudentId(user._id));
  }, [dispatch]);

  console.log('orders', orders);

  if (orders.loading) {
    return <h1>Loading...</h1>;
  }

  let filteredOrders = [];

  if (search && orders.orders.length > 0) {
    filteredOrders = orders.orders.filter((order) =>
      order.subjectName.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredOrders = orders.orders;
  }

  return (
    <div className='container p-4 mx-auto'>
      {/* Search */}
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
      <div>
        {filteredOrders.map((order, i) => (
          <div
            className='flex flex-col justify-between p-4 bg-white rounded-md md:flex-row'
            key={i}>
            <div>
              <h1 className='m-0 font-bold'>Mathematics</h1>
              <div className='flex items-center gap-2'>
                <HiClock />
                <span className='text-slate-500'>50 Hours</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold'>Status</span>
                <span>Offer sent to mentor</span>
              </div>
            </div>
            <div className='flex flex-col items-end justify-end'>
              <span>Offered Price</span>
              <h1 className='font-bold'>Rp 10.000</h1>
              <div
                className='p-2 font-medium text-center text-white bg-blue-500 rounded-md'
                style={{ width: 'fit-content' }}>
                Waiting for Approval
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

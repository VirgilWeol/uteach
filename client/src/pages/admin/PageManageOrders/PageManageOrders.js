import React, { useEffect, useRef, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import avatar from '../../../assets/avatarBig.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOrder,
  getOrder,
  updateOrder
} from '../../../actions/orderActions';

export default function PageManageOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const editModalRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    rating: '',
    price: '',
    contract: '',
    description: ''
  });

  const { rating, price, contract, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const onSubmit = (id) => {
    const data = {
      _id: id,
      rating,
      price,
      contract,
      description
    };

    dispatch(updateOrder(id, data));

    dispatch(getOrder());
    editModalRef.current.close();
  };

  useEffect(() => {
    if (search && orders.length > 0) {
      const filtered = orders.filter(
        (order) =>
          order.studentName.toLowerCase().includes(search.toLowerCase()) ||
          order._id.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [search, orders]);

  if (orders.length === 0) {
    return <h1>No orders</h1>;
  }

  return (
    <>
      <dialog
        ref={editModalRef}
        className='fixed inset-0 z-10 overflow-y-hidden bg-transparent'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold'>Edit Order</h1>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='w-full'>
              <div className='mb-2'>
                <label htmlFor='rating' className='text-lg font-semibold'>
                  Rating
                </label>
                <input
                  type='text'
                  name='rating'
                  value={rating}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='price' className='text-lg font-semibold'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  value={price}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='contract' className='text-lg font-semibold'>
                  Contract
                </label>
                <input
                  type='text'
                  name='contract'
                  value={contract}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='description' className='text-lg font-semibold'>
                  Description
                </label>
                <input
                  type='text'
                  name='description'
                  value={description}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
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
        <div className='flex flex-col gap-2'>
          {filteredOrders &&
            filteredOrders.map((order, i) => (
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
                      {order.studentName}
                    </h1>
                    <p className='m-0 text-sm'>{order.status}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    className='px-8 py-2 text-white bg-blue-500 rounded-md'
                    onClick={() => {
                      editModalRef.current.showModal();
                      setFormData({
                        id: order._id,
                        rating: order.rating,
                        price: order.price,
                        contract: order.contract,
                        description: order.description
                      });
                    }}>
                    Edit
                  </button>
                  <button
                    className='px-8 py-2 text-white bg-red-500 rounded-md'
                    onClick={() => dispatch(deleteOrder(order._id))}>
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

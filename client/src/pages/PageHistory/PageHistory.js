import React, { useEffect, useRef, useState } from 'react';
import { HiClock, HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByStudentId, updateOrder } from '../../actions/orderActions';
import StarRating from '../../components/StarRating';

export default function PageHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const feedbackModalRef = useRef(null);

  useEffect(() => {
    dispatch(getOrderByStudentId(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleFeedback = (e) => {
    e.preventDefault();
    dispatch(
      updateOrder(selectedOrder, {
        status: 'Finished',
        rating: rating,
        feedback: feedback
      })
    );
    feedbackModalRef.current.close();
  };

  return (
    <>
      <dialog
        ref={feedbackModalRef}
        className='fixed inset-0 z-10 overflow-y-hidden bg-transparent'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-black opacity-75'></div>
          </div>
          <span
            className='absolute top-0 right-0 flex items-center p-4 text-4xl cursor-pointer'
            onClick={() => feedbackModalRef.current.close()}>
            &times;
          </span>
          <div className='relative z-10 p-6 bg-white rounded-md'>
            <h1 className='text-2xl font-bold'>Feedback</h1>
            <div className='flex flex-col gap-4'>
              <div>
                <label htmlFor='rating'>Rating</label>
                <StarRating
                  count={5}
                  rating={rating}
                  onRatingChange={setRating}
                />
              </div>
              {/* desc input */}
              <div>
                <label htmlFor='feedback'>Feedback</label>
                <textarea
                  name='feedback'
                  id='feedback'
                  cols='30'
                  rows='10'
                  className='w-full p-2 bg-transparent border rounded-md border-slate-200'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-blue-500 rounded-md'
                onClick={handleFeedback}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className='container p-4 mx-auto'>
        {/* Search */}
        {/* <div className='flex items-center justify-between mb-4'>
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
      </div> */}
        <div className='flex flex-col gap-4'>
          {filteredOrders.map((order, i) => (
            <div
              className='flex flex-col justify-between p-4 bg-white rounded-md md:flex-row'
              key={i}>
              <div>
                <h1 className='m-0 font-bold'>{order.subjectName}</h1>
                <div className='flex items-center gap-2'>
                  <HiClock />
                  <span className='text-slate-500'>{order.contract} Hours</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>Status</span>
                  <span>
                    {order.status === 'Approved'
                      ? 'Waiting for mentor to start session'
                      : order.status}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-end justify-end'>
                <span>Offered Price</span>
                <h1 className='font-bold'>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(order.price)}
                </h1>
                {user.activeRole === 'student' &&
                order.status === 'Ofer sent to mentor' ? (
                  <div className='flex justify-end gap-2'>
                    <button
                      className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500 '
                      onClick={() =>
                        dispatch(updateOrder(order._id, { status: 'Declined' }))
                      }>
                      Decline
                    </button>
                    <button
                      className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                      onClick={() =>
                        dispatch(updateOrder(order._id, { status: 'Approved' }))
                      }>
                      Approve
                    </button>
                  </div>
                ) : user.activeRole === 'student' &&
                  order.status === 'Offer sent to student' ? (
                  <div className='flex justify-end gap-2'>
                    <button
                      className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500 '
                      onClick={() =>
                        dispatch(updateOrder(order._id, { status: 'Declined' }))
                      }>
                      Decline
                    </button>
                    <button
                      className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                      onClick={() =>
                        dispatch(updateOrder(order._id, { status: 'Approved' }))
                      }>
                      Approve
                    </button>
                  </div>
                ) : user.activeRole === 'student' &&
                  order.status === 'Approved' ? (
                  <button
                    className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                    onClick={() =>
                      dispatch(
                        updateOrder(order._id, { status: 'On Progress' })
                      )
                    }>
                    Start Session
                  </button>
                ) : user.activeRole === 'student' &&
                  order.status === 'On Progress' ? (
                  <button
                    className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                    onClick={() =>
                      dispatch(
                        updateOrder(order._id, { status: 'Give Feedback' })
                      )
                    }>
                    End Session
                  </button>
                ) : (
                  user.activeRole === 'student' &&
                  order.status === 'Give Feedback' && (
                    <button
                      className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                      onClick={() => {
                        feedbackModalRef.current.showModal();
                        setSelectedOrder(order._id);
                      }}>
                      Give Feedback
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

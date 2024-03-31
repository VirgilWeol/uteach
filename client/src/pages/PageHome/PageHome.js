import React, { useEffect, useRef, useState } from 'react';
import {
  HiAcademicCap,
  HiClock,
  HiMiniMagnifyingGlass,
  HiMiniUserGroup,
  HiXMark
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../../actions/subjectActions';
import { Link } from 'react-router-dom';
import { getOrderByStudentId, updateOrder } from '../../actions/orderActions';
import { getItem, updateItem } from '../../actions/itemActions';

export default function PageHome() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject);
  const orders = useSelector((state) => state.order);
  const items = useSelector((state) => state.item);
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const adjustPriceModalRef = useRef(null);

  useEffect(() => {
    if (user.activeRole === 'student') {
      dispatch(getSubject());
    }
    if (user.activeRole === 'mentor') {
      dispatch(getOrderByStudentId(user._id));
    }
    if (user.activeRole === 'admin') {
      dispatch(getItem());
    }
  }, [dispatch, user.activeRole, user._id]);

  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (subjects.loading) {
    return <h1>Loading...</h1>;
  }

  if (subjects.subjects.length === 0) {
    return <h1>No Subject Found</h1>;
  }

  let filteredSubjects = [];

  if (search && subjects.subjects.length > 0) {
    filteredSubjects = subjects.subjects.filter((subject) =>
      subject.subjectName.toLowerCase().includes(search?.toLowerCase())
    );
  } else {
    filteredSubjects = subjects.subjects;
  }

  const handleAdjustPrice = (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    dispatch(
      updateOrder(selectedOrder, {
        price: price,
        status: 'Offer sent to student'
      })
    );
  };

  if (orders.orders.length === 0) {
    return (
      <div className='container p-4 mx-auto'>
        <h1>No Order Found</h1>
      </div>
    );
  }

  return (
    <>
      <dialog
        ref={adjustPriceModalRef}
        className='fixed inset-0 z-50 overflow-y-hidden bg-transparent'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='relative w-full max-w-md p-4 m-4 bg-white rounded-md shadow-md'>
            <h1 className='m-0 font-bold leading-none'>Adjust Price</h1>
            <button
              onClick={() => adjustPriceModalRef.current.close()}
              className='absolute text-slate-500 hover:text-slate-700 top-3 right-3'>
              <HiXMark />
            </button>
            <form onSubmit={handleAdjustPrice}>
              <div className='flex flex-col gap-4'>
                <div>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='number'
                    name='price'
                    className='w-full p-2 bg-transparent border rounded-md border-slate-200'
                  />
                </div>
                <div className='flex justify-end gap-2'>
                  <button
                    type='button'
                    onClick={() => adjustPriceModalRef.current.close()}
                    className='px-12 py-2 text-white rounded-md bg-slate-500'>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-12 py-2 text-white bg-blue-500 rounded-md'>
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <div className='container p-4 mx-auto'>
        {user.activeRole === 'student' && (
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
        )}
        <div>
          {user.activeRole === 'student' &&
            filteredSubjects.map((subject, i) => (
              <Link
                to={`/${subject.subjectName}/mentors`}
                key={i}
                // randomize border color
                style={{ borderColor: randomColor() }}
                className='flex flex-col items-center justify-between w-full p-8 mb-4 bg-white border-b-8 rounded-md shadow-md md:flex-row text-decoration-none text-slate-800 hover:text-slate-900'>
                <div>
                  <h1 className='m-0 font-bold leading-none '>
                    {subject.subjectName}
                  </h1>
                  <div className='flex items-center gap-2'>
                    <HiAcademicCap />
                    <span className='text-slate-500'>
                      {subject.mentors} Verified Mentors
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <HiMiniUserGroup />
                    <span className='text-slate-500'>
                      {subject.students} Students
                    </span>
                  </div>
                </div>
                <div>
                  <span>Start from</span>
                  <h1 className='font-bold leading-none'>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(subject.minPrice)}
                  </h1>
                </div>
              </Link>
            ))}
          {user.activeRole === 'mentor' &&
            orders.orders.map((order, i) => (
              <div
                key={user._id}
                className={`flex flex-col w-full p-8 mb-4 ${
                  order.status === 'Declined' || order.status === 'Finished'
                    ? 'bg-slate-200'
                    : 'bg-white'
                } rounded-md shadow-md text-decoration-none text-slate-800 hover:text-slate-900`}>
                <h1 className='m-0 leading-none ont-bold'>
                  {order.studentName}
                </h1>
                <div className='flex items-center gap-2'>
                  <HiClock />
                  {order.contract} Hours
                </div>
                <h2 className='m-0 mt-4 text-sm font-bold leading-none text-dark'>
                  Description
                </h2>
                <p className='text-slate-500'>{order.description}</p>
                <div className='flex flex-col items-end justify-end'>
                  <span>Offered Price</span>
                  <h1 className='font-bold leading-none'>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(order.price)}
                  </h1>
                </div>
                <div className='flex justify-between'>
                  <div>
                    <h2 className='m-0 mt-4 text-sm font-bold leading-none text-dark'>
                      Status
                    </h2>
                    <p className='text-slate-500'>{order.status}</p>
                  </div>
                  {order.status === 'Offer sent to mentor' ? (
                    <div className='flex justify-end gap-2'>
                      <button
                        className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500 '
                        onClick={() =>
                          dispatch(
                            updateOrder(order._id, { status: 'declined' })
                          )
                        }>
                        Decline
                      </button>
                      <button
                        className='px-12 py-2 mt-4 text-white rounded-md bg-slate-500 '
                        onClick={() => {
                          adjustPriceModalRef.current.showModal();
                          setSelectedOrder(order._id);
                        }}>
                        Adjust Price
                      </button>
                      <button
                        className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                        onClick={() =>
                          dispatch(
                            updateOrder(order._id, { status: 'Approved' })
                          )
                        }>
                        Approve
                      </button>
                    </div>
                  ) : order.status === 'Approved' ? (
                    <button
                      className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                      onClick={() =>
                        dispatch(
                          updateOrder(order._id, { status: 'On Progress' })
                        )
                      }>
                      Start Session
                    </button>
                  ) : (
                    order.status === 'On Progress' && (
                      <button
                        className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                        onClick={() =>
                          dispatch(
                            updateOrder(order._id, { status: 'Give Feedback' })
                          )
                        }>
                        End Session
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          {user.activeRole === 'admin' &&
            items.items.map((item, i) => (
              <div
                key={i}
                className='flex flex-col w-full p-8 mb-4 bg-white rounded-md shadow-md text-decoration-none text-slate-800 hover:text-slate-900'>
                <div className='flex items-center justify-between'>
                  <h1 className='m-0 font-bold leading-none'>
                    {item.mentorName}
                  </h1>
                  <span
                    className={`px-2 py-1 text-white rounded-md ${
                      item.status === 'Approved'
                        ? 'bg-green-500'
                        : item.status === 'Declined'
                        ? 'bg-red-500'
                        : 'bg-slate-500'
                    }`}>
                    {item.status}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>Phone Number</span>
                  <span>{item.phone}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>GPA</span>
                  <span>{item.gpa}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>Skills</span>
                  <span>{item.skills}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>Certificate</span>
                  <span>{item.certificate}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>Description</span>
                  <span>{item.description}</span>
                </div>
                {item.status === 'Waiting for Approval' && (
                  <div className='flex justify-end gap-2'>
                    <button
                      className='px-12 py-2 mt-4 bg-transparent rounded-md text-slate-500 '
                      onClick={() => {
                        dispatch(updateItem(item._id, 'Declined'));
                        window.location.reload();
                      }}>
                      Decline
                    </button>
                    <button
                      className='px-12 py-2 mt-4 text-white bg-blue-500 rounded-md '
                      onClick={() => {
                        dispatch(updateItem(item._id, 'Approved'));
                        window.location.reload();
                      }}>
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

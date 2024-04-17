import React, { useEffect, useRef, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import avatar from '../../../assets/avatarBig.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItem, updateItem } from '../../../actions/itemActions';

export default function PageManageItems() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const editModalRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    price: '',
    rating: '',
    description: '',
    gpa: '',
    skills: '',
    certificate: ''
  });

  const { price, rating, description, gpa, skills, certificate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  const onSubmit = (id) => {
    const data = {
      _id: id,
      price,
      rating,
      description,
      gpa,
      skills,
      certificate
    };

    dispatch(updateItem(id, data));

    dispatch(getItem());
    editModalRef.current.close();
  };

  useEffect(() => {
    if (search && items.length > 0) {
      const filtered = items.filter(
        (item) =>
          item.mentorName.toLowerCase().includes(search.toLowerCase()) ||
          item._id.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [search, items]);

  if (items.length === 0) {
    return <h1>No items</h1>;
  }

  return (
    <>
      <dialog
        ref={editModalRef}
        className='fixed inset-0 z-10 overflow-y-hidden bg-transparent'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold'>Edit Item</h1>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='w-full'>
              <div className='mb-2'>
                <label htmlFor='price' className='text-lg font-semibold'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  value={price}
                  onChange={onChange}
                  className='w-full p-2 border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='rating' className='text-lg font-semibold'>
                  Rating
                </label>
                <input
                  type='text'
                  name='rating'
                  value={rating}
                  onChange={onChange}
                  className='w-full p-2 border rounded-md'
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
                  className='w-full p-2 border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='gpa' className='text-lg font-semibold'>
                  GPA
                </label>
                <input
                  type='text'
                  name='gpa'
                  value={gpa}
                  onChange={onChange}
                  className='w-full p-2 border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='skills' className='text-lg font-semibold'>
                  Skills
                </label>
                <input
                  type='text'
                  name='skills'
                  value={skills}
                  onChange={onChange}
                  className='w-full p-2 border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='certificate' className='text-lg font-semibold'>
                  Certificate
                </label>
                <input
                  type='text'
                  name='certificate'
                  value={certificate}
                  onChange={onChange}
                  className='w-full p-2 border rounded-md'
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
          {filteredItems &&
            filteredItems.map((item, i) => (
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
                      {item.mentorName}
                    </h1>
                    <p className='m-0 text-sm'>{item.subject}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    className='px-8 py-2 text-white bg-blue-500 rounded-md'
                    onClick={() => {
                      editModalRef.current.showModal();
                      setFormData({
                        id: item._id,
                        price: item.price,
                        rating: item.rating,
                        description: item.description,
                        gpa: item.gpa,
                        skills: item.skills,
                        certificate: item.certificate
                      });
                    }}>
                    Edit
                  </button>
                  <button
                    className='px-8 py-2 text-white bg-red-500 rounded-md'
                    onClick={() => dispatch(deleteItem(item._id))}>
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

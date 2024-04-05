import React, { useEffect, useRef, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubject,
  deleteSubject,
  getSubject,
  updateSubject
} from '../../../actions/subjectActions';

export default function PageManageSubjects() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subjects);
  const editModalRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [dialogMode, setDialogMode] = useState('add');
  const [formData, setFormData] = useState({
    id: '',
    subjectName: '',
    students: '',
    mentors: '',
    minPrice: ''
  });

  const { subjectName, students, mentors, minPrice } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(getSubject());
  }, [dispatch]);

  const onSubmit = (id) => {
    const data = {
      _id: id,
      subjectName,
      students,
      mentors,
      minPrice
    };

    // dispatch(updateSubject(id, data));
    if (dialogMode === 'add') {
      dispatch(addSubject(data));
    } else {
      dispatch(updateSubject(id, data));
    }

    dispatch(getSubject());
    editModalRef.current.close();
  };

  useEffect(() => {
    if (search && subjects.length > 0) {
      const filtered = subjects.filter(
        (subject) =>
          subject.subjectName.toLowerCase().includes(search.toLowerCase()) ||
          subject._id.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [search, subjects]);

  if (subjects.length === 0) {
    return <h1>No subjects</h1>;
  }

  return (
    <>
      <dialog
        ref={editModalRef}
        className='fixed inset-0 z-10 overflow-y-hidden bg-transparent'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold'>
            {dialogMode === 'add' ? 'Add Subject' : 'Edit Subject'}
          </h1>
          {/* edit form */}
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='w-full'>
              <div className='mb-2'>
                <label htmlFor='subjectName' className='text-lg font-semibold'>
                  Subject Name
                </label>
                <input
                  type='text'
                  name='subjectName'
                  value={subjectName}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='students' className='text-lg font-semibold'>
                  Students
                </label>
                <input
                  type='number'
                  name='students'
                  value={students}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='mentors' className='text-lg font-semibold'>
                  Mentors
                </label>
                <input
                  type='number'
                  name='mentors'
                  value={mentors}
                  onChange={onChange}
                  className='w-full p-2 bg-transparent border rounded-md'
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='minPrice' className='text-lg font-semibold'>
                  Min Price
                </label>
                <input
                  type='number'
                  name='minPrice'
                  value={minPrice}
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
        <div className='flex items-center justify-between gap-2 mb-4'>
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
          {/* add subjects button */}
          <div className='flex'>
            <button
              className='px-8 py-2 text-white bg-blue-500 rounded-md whitespace-nowrap'
              onClick={() => {
                setDialogMode('add');
                editModalRef.current.showModal();
                setFormData({
                  id: '',
                  subjectName: '',
                  students: '',
                  mentors: '',
                  minPrice: ''
                });
              }}>
              Add Subject
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          {filteredSubjects &&
            filteredSubjects.map((subject, i) => (
              <div
                key={i}
                className='flex items-center justify-between p-2 bg-white rounded-md'>
                <div className='flex items-center justify-center gap-2'>
                  <div className='flex flex-col justify-center'>
                    <h1 className='m-0 text-lg font-semibold leading-none'>
                      {subject.subjectName}
                    </h1>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    className='px-8 py-2 text-white bg-blue-500 rounded-md'
                    onClick={() => {
                      setDialogMode('edit');
                      editModalRef.current.showModal();
                      setFormData({
                        id: subject._id,
                        subjectName: subject.subjectName,
                        students: subject.students,
                        mentors: subject.mentors,
                        minPrice: subject.minPrice
                      });
                    }}>
                    Edit
                  </button>
                  <button
                    className='px-8 py-2 text-white bg-red-500 rounded-md'
                    onClick={() => dispatch(deleteSubject(subject._id))}>
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

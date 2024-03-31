import React, { useEffect, useState } from 'react';
import {
  HiAcademicCap,
  HiMiniMagnifyingGlass,
  HiMiniUserGroup
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../../actions/subjectActions';
import { Link } from 'react-router-dom';

export default function PageHome() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getSubject());
  }, [dispatch]);

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
        {filteredSubjects.map((subject, i) => (
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
      </div>
    </div>
  );
}

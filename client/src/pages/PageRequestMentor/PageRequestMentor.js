import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getItem } from '../../actions/itemActions';
import { getSubject } from '../../actions/subjectActions';
import { useNavigate } from 'react-router-dom';

export default function PageRequestMentor() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const item = useSelector((state) => state.item);
  const error = useSelector((state) => state.error);
  const subjectState = useSelector((state) => state.subject);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subjectData: {
      subjectId: '',
      subject: ''
    },
    gpa: '',
    skills: '',
    certificate: '',
    description: ''
  });
  const { subjectData, gpa, skills, certificate, description } = formData;
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    dispatch(getSubject());
    dispatch(getItem());

    // if userId exist in item collection then set requested to true
    if (item.items) {
      const found = item.items.find((item) => item.mentorId === user._id);
      if (found) {
        setRequested(true);
      }
    }
  }, [dispatch, user._id, item.items]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const data = {
      mentorId: user._id,
      subjectId: subjectData.subjectId,
      mentorName: user.name,
      subject: subjectData.subject,
      description,
      phone: user.phone,
      age: user.age,
      address: user.address,
      gpa,
      skills,
      certificate
    };

    console.log('data', data);

    // if there's empty field
    for (const key in data) {
      if (data[key] === '') {
        alert('Please fill in all the fields');
        return;
      }
    }

    dispatch(addItem(data));

    if (!error.id) {
      navigate('/');
    }

    if (item.loading === false) {
      navigate('/');
    }
  };

  if (item.loading === true) {
    return (
      <div className='container p-4 mx-auto'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold text-dark'>Mentor Form</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (requested === true) {
    return (
      <div className='container p-4 mx-auto'>
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-3xl font-bold text-dark'>Mentor Form</h1>
          <p>Waiting for approval</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container p-4 mx-auto'>
      <div className='p-4 bg-white rounded-md'>
        <h1 className='text-3xl font-bold text-dark'>Mentor Form</h1>
        <p>Fill in this form to become mentor and start earning by teaching.</p>
        <div className='mb-2'>
          <label htmlFor='subject' className='text-slate-500'>
            Subject
          </label>
          <select
            id='subject'
            name='subjectName'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            onChange={(e) => onChange(e)}
            required>
            <option value=''>Select Subject</option>
            {subjectState.loading === false &&
              subjectState.subjects.map((sub) => (
                <option
                  key={sub._id}
                  value={
                    (subjectData.subjectId = sub._id) &&
                    (subjectData.subject = sub.subjectName)
                  }>
                  {sub.subjectName}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor='gpa' className='text-slate-500'>
            GPA
          </label>
          <input
            type='text'
            id='gpa'
            name='gpa'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            placeholder='Enter your GPA'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='skills' className='text-slate-500'>
            Skills
          </label>
          <textarea
            id='skills'
            name='skills'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            placeholder='Enter your skills'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='certificate' className='text-slate-500'>
            Certificate Link
          </label>
          <input
            type='text'
            id='certificate'
            name='certificate'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            placeholder='Enter your certificate link'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {/* Description */}
        <div className='mb-2'>
          <label htmlFor='description' className='text-slate-500'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='w-full p-2 bg-transparent border rounded-md active:outline-none focus:outline-none border-slate-200'
            placeholder='what will you teach'
            onChange={(e) => onChange(e)}
            required
          />
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
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { HiStar } from 'react-icons/hi2';

function StarRating({ count, rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    onRatingChange(value);
  };

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className='flex items-center'>
      {[...Array(count)].map((_, i) => {
        const value = i + 1;
        const isFilled = value <= (hoverRating || rating);

        return (
          <span
            key={i}
            className='text-2xl text-gray-300 cursor-pointer hover:text-yellow-400'
            onClick={() => handleClick(value)}
            onMouseOver={() => handleMouseOver(value)}
            onMouseLeave={handleMouseLeave}>
            {isFilled ? <HiStar className='text-yellow-400' /> : <HiStar />}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;

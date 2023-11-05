/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const SquareRating = ({ rating }) => {
  const [ratingColor, setRatingColor] = useState('bg-yellow-300');

  if (rating < 1 || rating > 5) {
    console.log('Error: Rating does not fit range of 1-5');
  }

  useEffect(() => {
    switch (rating) {
      case 1:
        setRatingColor('bg-red-500');
        break;
      case 2:
        setRatingColor('bg-red-400');
        break;
      case 3:
        setRatingColor('bg-yellow-400');
        break;
      case 4:
        setRatingColor('bg-blue-400');
        break;
      case 5:
        setRatingColor('bg-blue-500');
        break;
    }
  }, [rating]);

  return (
    <div
      className={`w-8 h-8 text-white font-bold text-lg ${ratingColor} flex items-center justify-center rounded-md`}
    >
      {rating}
    </div>
  );
};
export default SquareRating;

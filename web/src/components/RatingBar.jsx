/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const RatingBar = ({ rating }) => {
  const [segmentColor1, setSegmentColor1] = useState('bg-gray-200');
  const [segmentColor2, setSegmentColor2] = useState('bg-gray-200');
  const [segmentColor3, setSegmentColor3] = useState('bg-gray-200');
  const [segmentColor4, setSegmentColor4] = useState('bg-gray-200');
  const [segmentColor5, setSegmentColor5] = useState('bg-gray-200');

  if (rating < 1 || rating > 5) {
    console.log('Error: Rating does not fit range of 1-5');
  }

  useEffect(() => {
    switch (rating) {
      case 1:
        setSegmentColor1('bg-red-500');
        break;
      case 2:
        setSegmentColor2('bg-red-400');
        break;
      case 3:
        setSegmentColor3('bg-yellow-400');
        break;
      case 4:
        setSegmentColor4('bg-green-400');
        break;
      case 5:
        setSegmentColor5('bg-green-500');
        break;
    }
  }, [rating]);

  return (
    <div className="flex gap-[2px]">
      <div
        className={`w-8 h-3 text-white font-bold text-lg flex items-center justify-center rounded-l-md ${segmentColor1}`}
      ></div>
      <div
        className={`w-8 h-3 text-white font-bold text-lg flex items-center justify-center ${segmentColor2}`}
      ></div>
      <div
        className={`w-8 h-3 text-white font-bold text-lg flex items-center justify-center ${segmentColor3}`}
      ></div>
      <div
        className={`w-8 h-3 text-white font-bold text-lg flex items-center justify-center ${segmentColor4}`}
      ></div>
      <div
        className={`w-8 h-3 text-white font-bold text-lg flex items-center justify-center rounded-r-md ${segmentColor5}`}
      ></div>
    </div>
  );
};
export default RatingBar;

/* eslint-disable react/prop-types */

import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

const ReviewCard = ({
  additionalComments,
  recommended,
  date,
  grade,
  delivery,
  textbook,
  likes,
  dislikes,
  professor,
  term,
  year,
}) => {
  return (
    <div className="flex">
      <div
        className={`w-4 flex ${
          recommended ? 'bg-blue-300' : 'bg-red-300'
        } rounded-l-lg`}
      ></div>
      <div className="border-t-2 border-b-2 border-r-2 rounded-r-lg border-gray-200 px-4 py-2">
        <div>
          <span className="italic">
            {recommended ? 'Recommended' : 'Not Recommended'}
          </span>
          <span>
            {' '}
            | {professor} | {term} {year}
          </span>
        </div>
        <div className="">{additionalComments}</div>

        <div></div>

        <div className="flex gap-4 items-center">
          <span>
            {likes > 0
              ? `{${likes} people found this review helpful}`
              : 'Be the first to rate this review'}
          </span>
          <div className="flex gap-1">
            <button className="bg-green-500 px-4 py-1.5 rounded-l-md text-white">
              <BsFillHandThumbsUpFill />
            </button>
            <button className="bg-red-500 px-4 py-1.5 rounded-r-md text-white">
              <BsFillHandThumbsDownFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;

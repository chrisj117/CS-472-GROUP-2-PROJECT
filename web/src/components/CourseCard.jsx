import SquareRating from './SquareRating';

const CourseCard = () => {
  return (
    <div className="border-2 p-4 rounded-md">
      <h4 className="font-bold text-lg">CS 301</h4>
      <p>
        Overall rating:
        <SquareRating />
      </p>
    </div>
  );
};
export default CourseCard;

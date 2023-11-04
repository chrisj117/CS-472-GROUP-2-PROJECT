import SquareRating from './SquareRating';

const CourseCard = () => {
  return (
    <div className="border-2 p-4 rounded-md">
      <h4 className="font-bold text-lg">CS 301</h4>
      <div>
        Overall rating:
        <SquareRating rating={4} />
      </div>
    </div>
  );
};
export default CourseCard;

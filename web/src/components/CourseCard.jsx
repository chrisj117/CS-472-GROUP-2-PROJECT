import { useEffect, useState } from 'react';
import SquareRating from './SquareRating';
import { Link } from 'react-router-dom';

const CourseCard = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [professorCount, setProfessorCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setCourseCode('CS 302');
    setCourseName('Data Structures and Algorithms');
    setProfessorCount(Math.ceil(Math.random() * 10)); // Temporary Mock Data until we can pull from API
    setReviewCount(Math.ceil(Math.random() * 100)); // Temporary Mock Data until we can pull from API
  }, []);

  return (
    <Link to={`courses/courseID`}>
      <div className="border-2 p-4 rounded-md flex justify-between items-center text-lg">
        <h4 className="font-bold text-lg underline">{courseCode}</h4>
        <div>{courseName}</div>
        <div className="flex gap-2 items-center">
          Overall Rating:
          <SquareRating rating={5} />
        </div>
        <div>Professors: {professorCount}</div>
        <div>Reviews: {reviewCount}</div>
      </div>
    </Link>
  );
};
export default CourseCard;

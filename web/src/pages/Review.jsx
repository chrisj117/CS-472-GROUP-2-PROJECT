// import { useState } from 'react';
import Searchbar from '../components/Searchbar';
import RatingBar from '../components/RatingBar';
import { BsFillPencilFill } from 'react-icons/bs';
import ReviewCard from '../components/ReviewCard';
// import ReviewCard from '../components/ReviewCard';

const Review = () => {
  // const [schoolName, setSchoolName] = useState(
  //   'University of Nevada, Las Vegas'
  // );
  // const [schoolNameShort, setSchoolNameShort] = useState('UNLV');

  return (
    <div className="max-w-screen-xl mx-auto mt-8 flex flex-col">
      {/* Top of screen (below nav bar) */}
      <div className="flex flex-col gap-4 mb-8 border-b-2 border-gray-100 pb-10">
        <h2 className="font-bold text-3xl">
          {/* {schoolName} ({schoolNameShort}) */}
          University of Nevada, Las Vegas (UNLV)
        </h2>
        <Searchbar
          searchingCourses={true}
          searchPlaceholder="Search for course"
        />
      </div>
      <div className="flex justify-between items-center mb-10 border-b-2 border-gray-100 pb-8">
        {/* Review button */}
        {/* NOTE: for now, this link is appearance only and will likely be refactored */}
        <div className="flex gap-3 items-center">
          {/* Professor dropdown */}
          <div className="relative inline-flex self-center">
            {/* svg dropdown arrow */}
            <svg
              className="bg-white absolute top-0 right-0 m-2 pointer-events-none p-2 rounded"
              width="34px"
              height="34px"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>

            {/* Professor list */}
            <select className="text-xl font-semibold rounded border-2 border-gray-400 h-12 w-45 pl-5 pr-10 bg-white appearance-none">
              <option>Dr. Professor</option>
              <option>Dr. Example</option>
              <option>Dr. LoremIpsum</option>
            </select>
          </div>

          <h2 className="font-bold text-2xl">
            CS 302 | Data Structures and Algorithms
          </h2>
        </div>

        <a
          href="#review"
          className="flex gap-2 items-center rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-md font-medium text-white transition focus:outline-none focus:ring"
        >
          <span>Review</span> <BsFillPencilFill />
        </a>
      </div>

      <div className="w-full max-w-screen-xl mx-auto mb-10 border-b-2 border-gray-100 pb-12">
        <h3 className="font-semibold text-2xl max-w-screen-xl w-full mx-auto mb-4">
          Ratings Summary
        </h3>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <RatingBar question="The course as a whole was:" rating={2} />
            <RatingBar question="The course content was:" rating={3} />
            <RatingBar
              question="The instructor's contribution to the course was:"
              rating={2}
            />
            <RatingBar question="Course organization was:" rating={1} />
            <RatingBar question="Explanations by instructor were:" rating={5} />
            <RatingBar
              question="Instructor's interest in student's progress was:"
              rating={4}
            />
          </div>
          <div className="flex flex-col gap-5">
            <RatingBar question="Amount of assigned work was:" rating={5} />
            <RatingBar
              question="Clarity of student requirements was:"
              rating={4}
            />
            <RatingBar question="Use of class time was:" rating={2} />
            <RatingBar
              question="Student's confidence in instructor's knowledge was:"
              rating={3}
            />
            <RatingBar
              question="Quality of questions or problems raised by the instructor was:"
              rating={3}
            />
            <RatingBar
              question="Instructor's interest in student's progress was:"
              rating={5}
            />
          </div>
        </div>
      </div>

      <div className="pb-12 mb-10 border-b-2 border-gray-100 max-w-screen-xl mx-auto w-full">
        <h3 className="font-semibold text-2xl mb-4">Written Reviews (4)</h3>
        <div className="flex flex-col gap-4 ">
          <ReviewCard
            additionalComments="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero cumque quaerat consequatur cum obcaecati molestias praesentium, repellendus, consequuntur corporis dolorem aut ratione dolores ab nostrum maiores?"
            recommended={true}
            date="November 5th, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={1}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />

          <ReviewCard
            additionalComments="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero cumque quaerat consequatur cum obcaecati molestias praesentium, repellendus, consequuntur corporis delectus velit eos nulla dolorem aut ratione dolores ab nostrum maiores?"
            recommended={true}
            date="November 5th, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={1}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />

          <ReviewCard
            additionalComments="Vero cumque quaerat consequatur cum obcaecati molestias praesentium, repellendus, consequuntur corporis delectus velit eos nulla dolorem aut ratione dolores ab nostrum maiores?"
            recommended={true}
            date="November 5th, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={1}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />

          <ReviewCard
            additionalComments="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            recommended={false}
            date="November 5th, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={1}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />
        </div>
      </div>

      {/* Additional comment box + post button */}
      {/* NOTE: for now, this lives on Review.jsx, but this will be moved to the "writing review page" */}
      <div className="max-w-screen-xl mx-auto w-full pb-40">
        <h3
          className="font-semibold text-2xl max-w-screen-xl w-full mx-auto mb-4"
          id="review"
        >
          Leave a Review
        </h3>
        <div>
          <textarea
            placeholder="Add additional comments..."
            className="p-2 focus:outline-1 focus:outline-blue-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-[60vw]"
          ></textarea>
          <div className="flex justify-end">
            <button className="text-sm font-semibold absolute bg-blue-500 hover:bg-blue-600 w-fit text-white py-2 rounded px-3">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;

// import { useState } from 'react';
import Searchbar from '../components/Searchbar';
import RatingBar from '../components/RatingBar';
import { BsChevronDown, BsFillPencilFill } from 'react-icons/bs';
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
        <div className="flex gap-6 items-center">
          <h2 className="font-bold text-2xl">
            CS 302 | Data Structures and Algorithms
          </h2>
          {/* Professor dropdown */}
          <div className="relative inline-flex self-center">
            {/* dropdown arrow */}
            <BsChevronDown
              className="absolute right-4 top-4 pointer-events-none"
              fontSize={18}
            />

            {/* Professor list */}
            <select className="text-lg font-semibold rounded border-2 border-gray-400 h-12 w-60 pl-4 pr-10 bg-white appearance-none">
              <option>Dr. Professor</option>
              <option>Dr. Example</option>
              <option>Dr. LoremIpsum</option>
            </select>
          </div>
        </div>

        <a
          href="#evaluation"
          className="flex gap-2 items-center rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-md font-medium text-white transition focus:outline-none focus:ring"
        >
          <span>Evaluate</span> <BsFillPencilFill />
        </a>
      </div>

      <div className="w-full max-w-screen-xl mx-auto mb-10 border-b-2 border-gray-100 pb-12">
        <h3 className="font-semibold text-2xl max-w-screen-xl w-full mx-auto mb-4">
          Evaluation Summary
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
        <div className="flex gap-6 items-center mb-4">
          <h3 className="font-semibold text-2xl">Written Evaluations (4)</h3>
          {/* Professor dropdown */}
          <div className="relative inline-flex self-center">
            {/* dropdown arrow */}
            <BsChevronDown
              className="absolute right-3 top-4 pointer-events-none"
              fontSize={18}
            />

            {/* Professor list */}
            <select className="text-lg font-semibold rounded border-2 border-gray-400 h-12 w-48 pl-4 pr-10 bg-white appearance-none">
              <option>Most Recent</option>
              <option>Most Helpful</option>
            </select>
          </div>
        </div>

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
            date="November 2nd, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={5}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />

          <ReviewCard
            additionalComments="Vero cumque quaerat consequatur cum obcaecati molestias praesentium, repellendus, consequuntur corporis delectus velit eos nulla dolorem aut ratione dolores ab nostrum maiores?"
            recommended={true}
            date="November 1st, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={0}
            professor="Dr. Professor"
            term="Fall"
            year="2023"
          />

          <ReviewCard
            additionalComments="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            recommended={false}
            date="October 30th, 2023"
            grade="B"
            delivery="In-Person"
            textbook="No"
            likes={4}
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
          id="evaluation"
        >
          Leave an Evaluation
        </h3>
        <div className="max-w-screen-lg mx-auto flex flex-col gap-16 border-2 border-gray-200 rounded-xl px-8 py-4">
          <div>
            <h4 className="font-semibold text-xl mb-4">Teaching Approaches</h4>
            <div className="flex flex-col gap-4">
              <RatingBar question="The course as a whole was:" rating={3} />
              <RatingBar question="The course content was:" rating={3} />
              <RatingBar
                question="The instructor's contribution to the course was:"
                rating={3}
              />
              <RatingBar question="Course organization was:" rating={3} />
              <RatingBar
                question="Explanations by instructor were:"
                rating={3}
              />
              <RatingBar
                question="Instructor's interest in student's progress was:"
                rating={3}
              />
              <RatingBar question="Amount of assigned work was:" rating={3} />
              <RatingBar
                question="Clarity of student requirements was:"
                rating={3}
              />
              <RatingBar question="Use of class time was:" rating={3} />
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
                rating={3}
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Required Information</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Professor </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Professor list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>Dr. Professor</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Term </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Term list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>Spring</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Year </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Year list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>2023</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center w-full max-w-sm">
                <button className="border-t-2 border-l-2 border-b-2 border-r border-gray-400 rounded-l-lg px-4 py-2 flex-1">
                  Recommended
                </button>
                <button className="border-t-2 border-r-2 border-b-2 border-l border-gray-400 rounded-r-lg px-4 py-2 flex-1">
                  Not Recommended
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Optional Information</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Textbook </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Professor list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>No</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Delivery </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Professor list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>In-Person</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                <p className="text-lg">Grade </p>
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Professor list */}
                  <select className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none">
                    <option>A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Additional Comments</h4>
            <textarea
              placeholder="Add additional comments..."
              className="p-2 focus:outline-1 focus:outline-blue-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full mb-4"
            ></textarea>

            <button className="text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white py-2 rounded px-3 w-full">
              Post Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;

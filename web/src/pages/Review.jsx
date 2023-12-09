/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import RatingBar from "../components/RatingBar";
import {
  BsChevronDown,
  BsFillEnvelopePaperFill,
  BsFillPencilFill,
} from "react-icons/bs";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../utilities/AuthProvider";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { format } from "date-fns";
import axios from "../utilities/Axios";
import {
  getSchool,
  getCourse,
  getCourses,
  getReviews,
} from "../utilities/GetData";

import { FaSearch } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import FormSuccess from "../components/FormSuccess";
import FormError from "../components/FormError";
import { updateReview } from "../utilities/PostData";

export async function loader({ params }) {
  const school = await getSchool(params.schoolId);
  const courses = await getCourses(params.schoolId);
  const course = await getCourse(params.schoolId, params.courseId);
  return { school, courses, course };
}

const Review = () => {
  const { school, courses, course } = useLoaderData();
  const { user } = useAuth();
  const { schoolId, courseId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [sortMethod, setSortMethod] = useState("mostRecent"); // Default is most recent
  const [professor, setProfessor] = useState(
    course.professors[0]
      ? course.professors[0].first_name + " " + course.professors[0].last_name
      : "",
  );
  const [loading, setLoading] = useState(false);
  const [messageResponse, setMessageResponse] = useState("");
  const [error, setError] = useState("");

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const [userInteractions, setUserInteractions] = useState({});

  const onHelpfulClick = async (reviewId, interactionType) => {
    // Find the review to update
    const reviewToUpdate = reviews.find((review) => review.id === reviewId);
    if (!reviewToUpdate) return;

    let newHelpfulCount = reviewToUpdate.helpful_count || 0;

    if (interactionType === "liked") {
        // Only increment if the review was not previously liked
        if (userInteractions[reviewId] !== "liked") {
            newHelpfulCount += 1;
        }
    } else if (interactionType === "disliked") {
        // Decrement if the review was previously liked
        if (userInteractions[reviewId] === "liked") {
            newHelpfulCount -= 1;
        }
    }

    // Prepare the data for the PUT request
    const updateData = {
        ...reviewToUpdate, // spread operator to copy all existing review data
        helpful_count: newHelpfulCount // updating only the helpful_count
    };

    try {
        await updateReview(reviewId, updateData);
        setMessageResponse('Review updated successfully!');

        // Update local state to reflect changes
        const updatedReviews = reviews.map((review) =>
            review.id === reviewId
                ? { ...review, helpful_count: newHelpfulCount }
                : review
        );
        setReviews(updatedReviews);

    } catch (error) {
        console.error("Error updating review:", error);
        setError('Failed to update review. Please try again.');
    }

    // Update user interactions
    setUserInteractions((prevInteractions) => ({
        ...prevInteractions,
        [reviewId]: interactionType,
    }));
};


  const sortReviews = (reviews, sortMethod) => {
    if (sortMethod === "mostRecent") {
      // Sort reviews by date in descending order (most recent first)
      return reviews
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortMethod === "mostHelpful") {
      // Sort reviews by helpful_count in descending order (most helpful first)
      return reviews.slice().sort((a, b) => b.helpful_count - a.helpful_count);
    }
    return reviews;
  };

  const GRADES = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
    "N/A",
  ];

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const YEARS = generateYears(1990); // generating years from 1990 to current year

  const handleRatingChange = (key, newRating) => {
    setReviewData((prevState) => ({
      ...prevState,
      [key]: newRating,
    }));
  };

  const [reviewData, setReviewData] = useState({
    school: "",
    course: "",
    professor: course.professors[0] ? course.professors[0] : "",
    review_text: "",
    term: "Fall", //default
    grade_received: "N/A", // default
    delivery_method: "In Person", // default
    textbook_required: false, // default
    helpful_count: 0,

    // fields for rating questions
    rating_course_overall: 3,
    rating_course_content: 3,
    rating_instructor_contribution: 3,
    rating_course_organization: 3,
    rating_instructor_explanation: 3,
    rating_instructor_interest: 3,
    rating_work_amount: 3,
    rating_clarity_requirements: 3,
    rating_class_time_use: 3,
    rating_student_confidence: 3,
    rating_question_quality: 3,

    year_taken: new Date().getFullYear(), // Current year as default
    recommended: true,
  });

  const calculateAverageRating = (ratingKey) => {
    const total = reviews.reduce((acc, review) => acc + review[ratingKey], 0);
    const average = total / reviews.length;
    return Math.round(average) || 0; // Default to 0 if no reviews
  };

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await getReviews(schoolId, courseId);

      if (reviewsResponse) {
        if (professor != "" && professor != null) {
          const professorReviews = reviewsResponse.filter(
            (review) => review.professor == professor,
          );
          const sortedReviews = sortReviews(professorReviews, sortMethod);
          setReviews(sortedReviews);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setReviewData({
      school: "",
      course: "",
      professor: course.professors[0] ? course.professors[0] : "",
      review_text: "",
      term: "Fall", //default
      grade_received: "N/A", // default
      delivery_method: "In Person", // default
      textbook_required: false,
      helpful_count: 0,

      // fields for rating questions
      rating_course_overall: 3,
      rating_course_content: 3,
      rating_instructor_contribution: 3,
      rating_course_organization: 3,
      rating_instructor_explanation: 3,
      rating_instructor_interest: 3,
      rating_work_amount: 3,
      rating_clarity_requirements: 3,
      rating_class_time_use: 3,
      rating_student_confidence: 3,
      rating_question_quality: 3,

      year_taken: new Date().getFullYear(), // Current year as default
      recommended: true,
    });
  }, [course]);

  useEffect(() => {
    fetchReviews();
  }, [sortMethod, professor, course]);

  const handleRecommendedChange = (isRecommended) => {
    setReviewData({ ...reviewData, recommended: isRecommended });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
    } else return;

    const postData = {
      ...reviewData,
      school: school.short_name, // Add school's short name
      course: course.subject + " " + course.catalog_number, // Add course subject and catalog number
      professor: professor,
    };

    try {
      await axios.post(
        // `/reviews/${schoolId}/${courseId}`,
        `/reviews/`,
        postData,
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(`You must enter additional comments.`);
      setMessageResponse("");
      setLoading(false);
      return;
    }

    setError("");

    setTimeout(() => {
      setLoading(false);
      setMessageResponse(`Evaluation submitted!`);
      fetchReviews();
    }, 1000);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentChange = (event) => {
    setReviewData({
      ...reviewData,
      review_text: event.target.value,
    });
  };

  return (
    <div className="overflow-auto max-w-screen-xl mx-auto mt-8 flex flex-col min-h-[calc(100vh-98px)] px-4">
      {/* Top of screen (below nav bar) */}
      <div className="flex flex-col gap-4 mb-8 border-b-2 border-zinc-200 dark:border-zinc-600 pb-10">
        <h2 className="font-bold text-3xl">
          {school.long_name} ({school.short_name})
          {/* University of Nevada, Las Vegas (UNLV) */}
        </h2>
        <div className="flex gap-2 items-center justify-center max-w-screen-xl w-full">
          <FaSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
          <Searchbar
            searchingCourses={true}
            searchPlaceholder="Search for course"
            className="w-full"
            courses={courses}
            change={true}
            school={school}
          />
        </div>
      </div>
      {!(school && course && courses) ? (
        <div className="flex w-full items-center justify-center dark:text-white text-black">
          <BeatLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-10 border-b-2 border-zinc-200 dark:border-zinc-600 pb-8 lg:flex-row flex-col">
            {/* Review button */}
            {/* NOTE: for now, this link is appearance only and will likely be refactored */}
            <div className="flex gap-6 items-center">
              <h2 className="font-bold text-2xl">
                {course.subject} {course.catalog_number} | {course.title}
              </h2>
              {/* Professor dropdown */}
              <div className="relative inline-flex self-center">
                {/* dropdown arrow */}
                <BsChevronDown
                  className="absolute right-4 top-4 pointer-events-none"
                  fontSize={18}
                />

                {/* Professor list */}
                <select
                  name="professor"
                  className="text-lg font-semibold rounded border-2 border-gray-400 h-12 w-45 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                >
                  {course.professors &&
                    course.professors.map((professor, index) =>
                      professor.first_name || professor.last_name ? (
                        <option
                          key={index}
                          value={`${professor.first_name} ${professor.last_name}`}
                        >
                          {professor.first_name} {professor.last_name}
                        </option>
                      ) : null,
                    )}
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

          <div className="w-full max-w-screen-xl mx-auto mb-10 border-b-2 border-zinc-200 dark:border-zinc-600 pb-12">
            <h3 className="font-semibold text-2xl max-w-screen-xl w-full mx-auto mb-4">
              Evaluation Summary
            </h3>
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-col gap-5">
                <RatingBar
                  question="The course as a whole was:"
                  rating={calculateAverageRating("rating_course_overall")}
                />
                <RatingBar
                  question="The course content was:"
                  rating={calculateAverageRating("rating_course_content")}
                />
                <RatingBar
                  question="The instructor's contribution to the course was:"
                  rating={calculateAverageRating(
                    "rating_instructor_contribution",
                  )}
                />
                <RatingBar
                  question="Course organization was:"
                  rating={calculateAverageRating("rating_course_organization")}
                />
                <RatingBar
                  question="Explanations by instructor were:"
                  rating={calculateAverageRating(
                    "rating_instructor_explanation",
                  )}
                />
                <RatingBar
                  question="Instructor's interest in student's progress was:"
                  rating={calculateAverageRating("rating_instructor_interest")}
                />
              </div>
              <div className="flex flex-col gap-5">
                <RatingBar
                  question="Amount of assigned work was:"
                  rating={calculateAverageRating("rating_work_amount")}
                />
                <RatingBar
                  question="Clarity of student requirements was:"
                  rating={calculateAverageRating("rating_clarity_requirements")}
                />
                <RatingBar
                  question="Use of class time was:"
                  rating={calculateAverageRating("rating_class_time_use")}
                />
                <RatingBar
                  question="Student's confidence in instructor's knowledge was:"
                  rating={calculateAverageRating("rating_student_confidence")}
                />
                <RatingBar
                  question="Quality of questions or problems raised by the instructor was:"
                  rating={calculateAverageRating("rating_question_quality")}
                />
                {/* <RatingBar
              question="Instructor's interest in student's progress was:"
              rating={5}
            /> */}
              </div>
            </div>
          </div>

          <div className="pb-12 mb-10 border-b-2 border-zinc-200 dark:border-zinc-600 max-w-screen-xl mx-auto w-full">
            {reviews.length > 0 ? (
              <div className="flex gap-6 items-center mb-4">
                <h3 className="font-semibold lg:text-2xl">
                  Evaluations ({reviews.length})
                </h3>
                {/* Professor dropdown */}
                <div className="relative inline-flex self-center">
                  {/* dropdown arrow */}
                  <BsChevronDown
                    className="absolute right-3 top-4 pointer-events-none"
                    fontSize={18}
                  />

                  {/* Filter review */}
                  <select
                    className="text-lg font-semibold rounded border-2 border-gray-400 h-12 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                    onChange={handleSortChange}
                    value={sortMethod}
                  >
                    <option value="mostRecent">Most Recent</option>
                    <option value="mostHelpful">Most Helpful</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-lg mt-2">
                There are no written evaluations. Write the first one!
              </div>
            )}

            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  reviewId={review.id}
                  user={user}
                  userInteraction={userInteractions[review.id]}
                  additionalComments={review.review_text}
                  recommended={review.recommended}
                  date={format(new Date(review.created_at), "MMMM do, yyyy")}
                  grade={review.grade_received}
                  delivery={review.delivery_method}
                  textbook={review.textbook_required ? "Yes" : "No"}
                  likes={review.helpful_count}
                  professor={`${review.professor}`}
                  term={review.term}
                  year={review.year_taken}
                  onHelpfulClick={onHelpfulClick}
                />
              ))}
            </div>
          </div>

          {/* Additional comment box + post button */}
          {/* NOTE: for now, this lives on Review.jsx, but this will be moved to the "writing review page" */}
          <div className="max-w-screen-xl mx-auto w-full pb-32">
            <h3
              className="font-semibold text-2xl max-w-screen-xl w-full mx-auto mb-4"
              id="evaluation"
            >
              Leave an Evaluation
            </h3>
            {user ? (
              <div className="max-w-screen-xl mx-auto flex flex-col gap-16 border-2 border-zinc-200 dark:border-zinc-600 rounded-xl px-8 py-8">
                <div>
                  <h4 className="font-semibold text-xl mb-4">
                    Teaching Approaches
                  </h4>
                  <div className="flex flex-col gap-4">
                    <RatingBar
                      question="The course as a whole was:"
                      rating={reviewData.rating_course_overall}
                      ratingKey="rating_course_overall"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-4"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="The course content was:"
                      rating={reviewData.rating_course_content}
                      ratingKey="rating_course_content"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="The instructor's contribution to the course was:"
                      rating={reviewData.rating_instructor_contribution}
                      ratingKey="rating_instructor_contribution"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Course organization was:"
                      rating={reviewData.rating_course_organization}
                      ratingKey="rating_course_organization"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Explanations by instructor were:"
                      rating={reviewData.rating_instructor_explanation}
                      ratingKey="rating_instructor_explanation"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Instructor's interest in student's progress was:"
                      rating={reviewData.rating_instructor_interest}
                      ratingKey="rating_instructor_interest"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Amount of assigned work was:"
                      rating={reviewData.rating_work_amount}
                      ratingKey="rating_work_amount"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Clarity of student requirements was:"
                      rating={reviewData.rating_clarity_requirements}
                      ratingKey="rating_clarity_requirements"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Use of class time was:"
                      rating={reviewData.rating_class_time_use}
                      ratingKey="rating_class_time_use"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Student's confidence in instructor's knowledge was:"
                      rating={reviewData.rating_student_confidence}
                      ratingKey="rating_student_confidence"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                    <RatingBar
                      question="Quality of questions or problems raised by the instructor was:"
                      rating={reviewData.rating_question_quality}
                      ratingKey="rating_question_quality"
                      onChange={handleRatingChange}
                      customWidth="flex-1"
                      customHeight="h-5"
                      className="max-w-xl"
                    />
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <h4 className="font-semibold text-xl mb-4">
                      Required Information
                    </h4>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                        <p className="text-lg">Term </p>
                        <div className="relative inline-flex self-center">
                          {/* dropdown arrow */}
                          <BsChevronDown
                            className="absolute right-3 top-4 pointer-events-none"
                            fontSize={18}
                          />

                          {/* Term list */}
                          <select
                            name="term"
                            className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                            onChange={handleSelectChange}
                          >
                            {/* Populate options here */}
                            <option>Fall</option>
                            <option>Spring</option>
                            <option>Summer</option>
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
                          <select
                            name="year_taken"
                            className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                            onChange={handleSelectChange}
                            value={reviewData.year_taken}
                          >
                            {YEARS.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 items-center justify-between w-full max-w-sm">
                      <p className="text-lg">Textbook </p>
                      <div className="relative inline-flex self-center">
                        {/* dropdown arrow */}
                        <BsChevronDown
                          className="absolute right-3 top-4 pointer-events-none"
                          fontSize={18}
                        />

                        {/* Textbook Required Dropdown */}
                        <select
                          name="textbook_required"
                          className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                          onChange={handleSelectChange}
                          value={reviewData.textbook_required ? "Yes" : "No"}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
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

                        <select
                          name="delivery_method"
                          className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                          onChange={handleSelectChange}
                        >
                          <option>In Person</option>
                          <option>Online</option>
                          <option>Hybrid</option>
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

                        {/* Grade Dropdown */}
                        <select
                          name="grade_received"
                          className="font-semibold rounded border-2 border-gray-400 h-10 w-48 pl-4 pr-10 bg-white appearance-none dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
                          onChange={handleSelectChange}
                          value={reviewData.grade_received}
                        >
                          {GRADES.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center w-full max-w-sm">
                      <button
                        type="button"
                        className={`border-t-2 border-l-2 border-b-2 border-r border-zinc-300 dark:border-zinc-600 text-sm lg:text-base ${
                          reviewData.recommended ? "bg-blue-500 text-white" : ""
                        } rounded-l-md px-0.5 py-2 lg:px-4 lg:py-2 flex-1`}
                        onClick={() => handleRecommendedChange(true)}
                      >
                        Recommended
                      </button>
                      <button
                        type="button"
                        className={`border-t-2 border-r-2 border-b-2 border-l border-zinc-300 dark:border-zinc-600 text-sm lg:text-base ${
                          !reviewData.recommended ? "bg-red-500 text-white" : ""
                        } rounded-r-md px-0.5 py-2 lg:px-4 lg:py-2 flex-1`}
                        onClick={() => handleRecommendedChange(false)}
                      >
                        Not Recommended
                      </button>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h4 className="font-semibold text-xl mb-4">
                      Additional Comments
                    </h4>
                    <textarea
                      placeholder="Add additional comments..."
                      className="p-2 focus:outline-1 focus:outline-blue-500 border-2 resize-none h-[120px] dark:border-zinc-600 rounded-md w-full mb-4 dark:bg-zinc-900"
                      value={reviewData.review_text}
                      onChange={handleCommentChange}
                    ></textarea>
                    <div className="flex flex-col items-center justify-center">
                      <FormError error={error} />
                      <button className="text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md px-3 w-full flex justify-center gap-4 items-center">
                        {loading ? (
                          <BeatLoader color="#ffffff" size="12px" />
                        ) : (
                          <>
                            <span>Post Evaluation</span>{" "}
                            <BsFillEnvelopePaperFill />
                          </>
                        )}
                      </button>
                      <FormSuccess success={messageResponse} />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-4 py-8 px-8 justify-center items-center border-zinc-200 border-2 rounded-lg dark:border-zinc-600">
                <span>Ready to contribute to the site? Sign in below!</span>

                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex mt-2 gap-2 items-center justify-center font-semibold"
                >
                  Login <FaArrowRight className="text-xl" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Review;

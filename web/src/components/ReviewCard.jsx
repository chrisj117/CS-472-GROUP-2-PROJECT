/* eslint-disable react/prop-types */

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAuth } from "../utilities/AuthProvider";

const ReviewCard = ({
  additionalComments,
  recommended,
  date,
  grade,
  delivery,
  textbook,
  likes,
  professor,
  term,
  year,
  onHelpfulClick,
  reviewId,
  userInteraction,
}) => {
  const { user } = useAuth();

  const handleThumbsUp = () => {
    if (!user) {
      alert("Please sign in to rate the review.");
      return;
    }
    if (userInteraction !== "liked") {
      onHelpfulClick(reviewId, "liked");
    }
  };

  const handleThumbsDown = () => {
    if (!user) {
      alert("Please sign in to rate the review.");
      return;
    }
    if (userInteraction === "liked") {
      onHelpfulClick(reviewId, "disliked");
    }
  };

  return (
    <div className="flex">
      <div
        className={`w-5 flex ${
          recommended ? "bg-blue-500" : "bg-red-500"
        } rounded-l-lg`}
      ></div>
      <div className="border-t-2 border-b-2 border-r-2 rounded-r-lg border-gray-200 dark:border-zinc-600 px-4 py-4 flex flex-col gap-6 w-full">
        <div className="lg:items-center gap-1 font-semibold flex flex-col lg:flex-row ">
          <span className="lg:text-lg">
            {recommended != null
              ? `${recommended ? "Recommended" : "Not Recommended"}`
              : "N/A"}
          </span>
          <span className="text-xs lg:text-base">
            — {professor ? professor : "N/A"} / {term ? term : "N/A"}{" "}
            {year ? year : "N/A"} / Grade: {grade ? grade : "N/A"} / Delivery:{" "}
            {delivery ? delivery : "N/A"} / Textbook:{" "}
            {textbook ? textbook : "N/A"}
          </span>
        </div>

        <div className="lg:px-2">
          {additionalComments ? additionalComments : "N/A"}
        </div>

        <div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center font-semibold">
          <div className="flex gap-4 items-center">
            <span className="text-xs lg:text-sm">
              {likes > 0
                ? `${likes} people found this evaluation helpful`
                : "Be the first to rate this evaluation"}
            </span>
            <div className="flex gap-0.5">
              <button
                onClick={handleThumbsUp}
                className={`bg-gray-400 hover:bg-blue-500 px-4 py-1 rounded-l-md text-white ${
                  userInteraction === "liked" ? "bg-blue-500" : ""
                }`}
              >
                <FaThumbsUp />
              </button>

              <button
                onClick={handleThumbsDown}
                className={`bg-gray-400 hover:bg-red-500 px-4 py-1 rounded-r-md text-white ${
                  userInteraction === "disliked" ? "bg-red-500" : ""
                }`}
              >
                <FaThumbsDown />
              </button>
            </div>
          </div>

          <span className="italic text-sm lg:text-base">
            {date ? date : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;

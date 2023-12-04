import { useEffect, useState } from "react";

const RatingBar = ({
  question,
  rating,
  onChange,
  ratingKey,
  className,
  customWidth = "w-16",
  customHeight = "h-3",
}) => {
  const [segmentColors, setSegmentColors] = useState([
    "bg-gray-300",
    "bg-gray-300",
    "bg-gray-300",
    "bg-gray-300",
    "bg-gray-300",
  ]);

  // Function to handle click on a rating segment
  const handleSegmentClick = (newRating) => {
    if (onChange) {
      onChange(ratingKey, newRating);
    }
  };

  useEffect(() => {
    // Update all segment colors based on the current rating
    const updatedColors = segmentColors.map((_, index) => {
      if (index + 1 === rating) {
        // Set the color only for the selected segment
        switch (rating) {
          case 1:
            return "bg-red-500";
          case 2:
            return "bg-red-400";
          case 3:
            return "bg-yellow-400";
          case 4:
            return "bg-blue-400";
          case 5:
            return "bg-blue-500";
          default:
            return "bg-gray-300";
        }
      }
      return "bg-gray-300";
    });
    setSegmentColors(updatedColors);
  }, [rating]);

  return (
    <div className={className}>
      <p className="mb-[2px]">{question}</p>
      <div className="flex gap-1">
        {segmentColors.map((color, index) => (
          <div
            key={index}
            className={`${customWidth} ${customHeight} text-white font-bold text-lg flex items-center justify-center ${color} ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md" : ""}`}
            onClick={() => handleSegmentClick(index + 1)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RatingBar;

const SquareRating = ({ rating }) => {
  if (rating < 1 || rating > 5) {
    console.log('Error: Rating does not fit range of 1-5');
  }

  return <div className="w-8 h-8">4</div>;
};
export default SquareRating;

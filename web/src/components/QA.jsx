/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
const QA = ({ question, answer }) => {
  return (
    <button className="w-full border-b-2 border-gray-300 pb-6 text-left group focus:outline-none">
      <div className="text-lg font-sans text-center">{question}</div>
      <div className="mt-3 hidden text-gray-700 group-focus:flex">
        <p>{answer}</p>
      </div>
    </button>
  );
};

export default QA;

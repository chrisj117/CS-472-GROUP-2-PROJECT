/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

const QA = ({ question, answer }) => {
  return (
    <button className="flex flex-col items-center w-full border-b-2 border-gray-300 pb-6 group dark:border-gray-600 transition-all">
      <div className="text-center italic">{question}</div>
      <p className="mt-3 text-gray-700 group-focus:flex hidden max-w-screen-md dark:text-gray-200">
        {answer}
      </p>
    </button>
  )
}

export default QA

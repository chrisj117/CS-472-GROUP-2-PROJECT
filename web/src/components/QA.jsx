/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

const QA = ({
  question,
  answer,
  openedAccordion,
  setOpenedAccordion,
  accordionNum,
}) => {
  return (
    <button
      className="w-full border-b-2 border-gray-300 pb-6 text-left focus:outline-none"
      onClick={() => {
        setOpenedAccordion(accordionNum);
      }}
    >
      <div className="text-lg font-sans text-center">{question}</div>
      {openedAccordion == accordionNum ? (
        <div className="mt-3 text-gray-700 group-focus:flex">
          <p>{answer}</p>
        </div>
      ) : null}
    </button>
  );
};

export default QA;

import QA from "../components/QA";

const Home = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Middle of page: "Search for your school" prompt and search bar */}
      <div className="flex justify-center py-12 h-10 mb-auto">
        <h1 className="text-xl no-underline text-grey-darkest hover:text-blue-dark">
          Search for your school below to get started!
        </h1>
      </div>
      {/* Search bar */}
      <div className="flex-1 mx-60">
        <div className="relative items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-none overflow-hidden">
          <input
            className="peer px-3 h-full w-full outline-none text-sm text-gray-900 bg-gray-300"
            type="text"
            id="search"
            placeholder="Enter school"
          />
        </div>
      </div>

      {/* Bottom of page: FAQ section */}
      <div className="h-auto px-20 py-12 justify-center">
        <h1 className="text-center py-4 text-2xl no-underline text-grey-darkest hover:text-blue-dark">
          Frequently Asked Questions
        </h1>
        {/* Question/Answer Components */}
        <QA
          question="Why are evaluations important?"
          answer="Evaluations provide a detailed review of a course that covers
              almost every aspect of the class, including workload, professors,
              textbooks, and more!"
        />
        <QA
          question="How can I contribute?"
          answer="You can leave your own course evaluations on a course page when
        pressing the Review button, and it will take you to a page where
        you can fill out a simple questionnaire. Sign ups are not
        required!"
        />
        <QA
          question="Why don't I see my school?"
          answer="You can send a request to add your school here! Your request may
        take 2 or more weeks to be processed."
        />
      </div>
    </div>
  );
};
export default Home;

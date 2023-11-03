import Searchbar from '../components/Searchbar';

const Home = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Searchbar />
      {/* Top of page: Logo, "About" link, and Request a "School" link */}
      <nav className="font-sans flex text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            MyCourseEvaluations
          </a>
        </div>
        <div>
          {/* "About" */}
          <a
            href="#"
            className="px-5 text-md no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >
            About
          </a>
          {/* Request a "School" */}
          <button
            className="rounded-lg bg-blue-600 px-5 py-3 text-md font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring"
            type="button"
          >
            Request A School
          </button>
        </div>
      </nav>

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
      <div className="h-auto px-20 py-12 justify-center transition-all">
        <h1 className="text-center py-4 text-2xl no-underline text-grey-darkest hover:text-blue-dark">
          Frequently Asked Questions
        </h1>
        {/* Start of Question/Answer component */}
        <button className="w-full border-b-2 border-gray-300 pb-6 text-left group focus:outline-none">
          <div className="text-lg font-sans text-center">
            Q: Why are evaluations important?
          </div>
          <div className="mt-3 hidden text-gray-700 group-focus:flex">
            <p>
              Evaluations provide a detailed review of a course that covers
              almost every aspect of the class, including workload, professors,
              textbooks, and more!
            </p>
          </div>
        </button>
        {/* End of Question/Answer component (repeat this section per Q/A pair needed) */}
        <button className="w-full border-b-2 border-gray-300 pb-6 text-left group mt-6 focus:outline-none">
          <div className="text-lg font-sans text-center">
            Q: How can I contribute?
          </div>
          <div className="mt-3 hidden text-gray-700 group-focus:flex">
            <p>
              You can leave your own course evaluations on a course page when
              pressing the Review button, and it will take you to a page where
              you can fill out a simple questionnaire. Sign ups are not
              required!
            </p>
          </div>
        </button>
        <button className="w-full border-b-2 border-gray-300 pb-6 text-left group mt-6 focus:outline-none">
          <div className="text-lg font-sans text-center">
            Q: Why don&apos;t I see my school?
          </div>
          <div className="mt-3 hidden text-gray-700 group-focus:flex">
            <p>
              You can send a request to add your school here! Your request may
              take 2 or more weeks to be processed.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Home;

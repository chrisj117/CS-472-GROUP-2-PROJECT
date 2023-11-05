import Searchbar from '../components/Searchbar';
import QA from '../components/QA';

const Home = () => {
  return (
    <div className="flex flex-col justify-evenly h-[calc(100vh-89px)] max-w-screen-xl mx-auto">
      {/* Search bar */}
      <div className="flex-1 flex flex-col w-full justify-center items-center gap-4 ">
        <p className="text-2xl font-semibold">
          Find your school below to get started!
        </p>
        <Searchbar
          searchingSchools={true}
          searchingCourses={false}
          className="w-full"
          searchPlaceholder="Ex: University of Nevada, Las Vegas / UNLV"
        />
      </div>

      {/* Bottom of page: FAQ section */}
      <div className="w-full justify-center transition-all mx-auto mb-8">
        <h1 className="text-center text-2xl no-underline text-grey-darkest hover:text-blue-dark mb-8 font-semibold">
          Frequently Asked Questions
        </h1>
        {/* Question/Answer Components */}
        <div className="flex flex-col gap-4">
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
    </div>
  );
};
export default Home;

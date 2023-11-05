import ReturnHome from '../components/ReturnHome';

const About = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 mt-8">About</h2>
      {/* Middle of page: "About" content */}
      <h3 className="w-6/12 text-xl font-extrabold mb-4">
        What&apos;s this site&apos;s purpose?
      </h3>
      <p className="w-6/12 text-m mb-8">
        MyCourseEvaluation serves as a hub for students to discuss courses. As
        of now, student feedback and information for courses is fragmented
        across various sites and amongst course catalogs. Rather than browsing
        multiple websites, users can use this site to leave their opinions on
        classes they have taken and browse other user posts to find out about
        classes they plan to take.
      </p>
      <h3 className="w-6/12 text-xl font-extrabold mb-4">Can I contribute?</h3>
      <p className="w-6/12 text-m mb-8">
        Sure! By simply leaving reviews in good faith and requesting to add
        schools, you are already contributing to the site&apos;s main content.
      </p>
      <h3 className="w-6/12 text-xl font-extrabold mb-4">
        What&apos;s the motivation behind making this site?
      </h3>
      <p className="w-6/12 text-m mb-8">
        This site is a class project for a group of college seniors that saw an
        unfulfilled niche in the online student review experience. Thus,
        MyCourseEvaluation was born as an open source project!
      </p>

      {/* Bottom of page: Return home button*/}
      <ReturnHome />
    </div>
  );
};
export default About;

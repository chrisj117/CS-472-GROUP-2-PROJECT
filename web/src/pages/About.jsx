import ReturnHome from "../components/ReturnHome";

const About = () => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-98px)] w-screen mx-auto px-4 md:max-w-screen-xl overflow-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 mt-6">About</h2>
      {/* Middle of page: "About" content */}
      <div className="w-full md:max-w-screen-md">
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          What&apos;s this site&apos;s purpose?
        </h3>
        <p className="text-sm md:text-m mb-6">
          MyCourseEvaluation serves as a hub for students to discuss courses. As
          of now, student feedback and information for courses is fragmented
          across various sites and amongst course catalogs. Rather than browsing
          multiple websites, users can use this site to leave their opinions on
          classes they have taken and browse other user posts to find out about
          classes they plan to take.
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          Can I contribute?
        </h3>
        <p className="text-sm md:text-m mb-6">
          Sure! By simply leaving reviews in good faith and requesting to add
          schools, you are already contributing to the site&apos;s main content.
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          What&apos;s the motivation behind making this site?
        </h3>
        <p className="text-sm md:text-m mb-6">
          This site is a class project for a group of college seniors that saw
          an unfulfilled niche in the online student review experience. Thus,
          MyCourseEvaluation was born as an open source project!
        </p>
      </div>

      {/* Bottom of page: Return home button*/}
      <ReturnHome />
    </div>
  )
}
export default About

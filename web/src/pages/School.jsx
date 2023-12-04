import CourseCard from "../components/CourseCard"
import Searchbar from "../components/Searchbar"

const School = () => {
  const schoolName = "University of Nevada, Las Vegas"
  const schoolNameShort = "UNLV"

  return (
    <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 min-h-[calc(100vh-98px)]">
      <h2 className="font-bold text-3xl">
        {schoolName} ({schoolNameShort})
      </h2>
      <Searchbar
        searchingCourses={true}
        searchPlaceholder="Ex: CS 472"
        className="flex-1 mb-8"
      />

      <div className="">
        <h3 className="font-bold text-2xl mb-4 px-32">Popular Courses:</h3>
        <div className="px-32 flex flex-col gap-2">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </section>
  )
}
export default School

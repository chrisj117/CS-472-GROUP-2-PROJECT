/* eslint-disable react-refresh/only-export-components */

import CourseCard from "../components/CourseCard"
import Searchbar from "../components/Searchbar"
import { useLoaderData } from "react-router-dom"
import { getCourses, getSchool } from "../utilities/GetData"

export async function loader({ params }) {
  const school = await getSchool(params.schoolId)
  const courses = await getCourses(params.schoolId)
  return { school, courses }
}

const School = () => {
  const { school, courses } = useLoaderData()

  return (
    <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 min-h-[calc(100vh-98px)]">
      <h2 className="font-bold text-3xl">
        {school.long_name} ({school.short_name})
      </h2>
      <Searchbar
        searchingCourses={true}
        searchPlaceholder="Ex: CS 472"
        className="flex-1 mb-8"
        courses={courses}
        change={true}
        school={school.short_name}
      />

      <div className="">
        <h3 className="font-bold text-2xl mb-4 px-32">Popular Courses:</h3>
        <div className="px-32 flex flex-col gap-2">
          {courses
            .map((course) => {
              return <CourseCard key={course.value} />
            })
            .slice(0, 5)}
        </div>
      </div>
    </section>
  )
}
export default School

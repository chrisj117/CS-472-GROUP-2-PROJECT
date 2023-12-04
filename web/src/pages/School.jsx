/* eslint-disable react-refresh/only-export-components */

import CourseCard from "../components/CourseCard"
import Searchbar from "../components/Searchbar"
import { useLoaderData } from "react-router-dom"
import { getCourses, getSchool } from "../utilities/GetData"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"

export async function loader({ params }) {
  const school = await getSchool(params.schoolId)
  const courses = await getCourses(params.schoolId)
  return { school, courses }
}

const School = () => {
  const { school, courses } = useLoaderData()
  const [filteredCourses, setFilteredCourses] = useState([])
  const [search, setSearch] = useState("")

  const handleCourses = (searchValue) => {
    setSearch(searchValue)

    const filteredOptions = courses.filter((option) =>
      option.label
        .replace(/ /g, "")
        .toLowerCase()
        .includes(searchValue.replace(/ /g, "").toLowerCase())
    )

    setFilteredCourses(filteredOptions)
  }

  useEffect(() => {
    handleCourses("")
  }, [])

  return (
    <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 min-h-[calc(100vh-98px)]">
      <h2 className="font-bold text-3xl">
        {school.long_name} ({school.short_name})
      </h2>

      <div className="mt-1 flex gap-2 items-center justify-center">
        <FaSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
        <input
          type="text"
          placeholder="Ex: University of Nevada Las Vegas"
          className="px-3 py-2 w-full border-2 rounded truncate dark:bg-zinc-900 dark:border-zinc-600 dark:text-white focus:outline-transparent"
          onChange={(e) => handleCourses(e.target.value)}
        />
      </div>

      <div className="py-4">
        <div className="px-32 flex flex-col gap-2">
          {filteredCourses.length > 0 ? (
            filteredCourses
              .map((course) => {
                return (
                  <CourseCard
                    key={course.value}
                    professorCount={course.professors.length}
                    courseSubject={course.subject}
                    courseTitle={course.title}
                    catalogNumber={course.catalog_number}
                  />
                )
              })
              .slice(0, 10)
          ) : (
            <div className="text-center text-lg">
              No results match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default School

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import CourseCard from "../components/CourseCard"
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
  const [search, setSearch] = useState("")
  const [filteredCourses, setFilteredCourses] = useState([])

  const handleCourses = () => {
    const filteredSubjects = courses.filter((option) =>
      option.subject
        .toString()
        .replace(/ /g, "")
        .toLowerCase()
        .includes(search.replace(/ /g, "").toLowerCase())
    )

    if (filteredSubjects.length > 0) {
      setFilteredCourses(filteredSubjects)
      return
    }

    const filteredCatalogues = courses.filter((option) =>
      option.value
        .toString()
        .replace(/ /g, "")
        .toLowerCase()
        .includes(search.replace(/ /g, "").toLowerCase())
    )

    if (filteredCatalogues.length > 0) {
      setFilteredCourses(filteredCatalogues)
      return
    }

    const filteredLabels = courses.filter((option) =>
      option.label
        .replace(/ /g, "")
        .toLowerCase()
        .includes(search.replace(/ /g, "").toLowerCase())
    )

    setFilteredCourses(filteredLabels.length > 0)
  }

  useEffect(() => {
    handleCourses(search)
  }, [search])

  return (
    <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 min-h-[calc(100vh-98px)] px-4">
      <h2 className="font-bold text-3xl">
        {school.long_name} ({school.short_name})
      </h2>

      <div className="mt-1 flex gap-3 items-center justify-center">
        <FaSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
        <input
          type="text"
          placeholder="Ex: University of Nevada Las Vegas"
          className="px-3 py-2 w-full border-2 rounded truncate dark:bg-zinc-900 dark:border-zinc-600 dark:text-white focus:outline-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="py-4 mb-12">
        <div className="flex flex-col gap-2">
          {filteredCourses.length > 0 ? (
            filteredCourses
              .map((course) => {
                return (
                  <CourseCard
                    key={course.value}
                    schoolId={school.short_name}
                    professorCount={course.professors.length}
                    courseSubject={course.subject}
                    courseTitle={course.title}
                    catalogNumber={course.catalog_number}
                    courseId={course.value}
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

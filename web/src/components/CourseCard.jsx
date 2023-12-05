/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

const CourseCard = ({
  courseSubject,
  courseTitle,
  catalogNumber,
  professorCount,
}) => {
  return (
    <Link to={`reviews/${courseSubject + catalogNumber}`}>
      <div className="border-2 px-6 py-2 rounded-md justify-between items-center text-lg dark:border-zinc-700 flex flex-col lg:flex-row">
        <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 basis-1/4 hover:underline">
          {courseSubject} {catalogNumber}
        </h4>
        <div className="overflow-ellipsis overflow-hidden text-left basis-1/2">
          {courseTitle}
        </div>
        <div className="overflow-ellipsis overflow-hidden basis-1/4 text-left lg:text-center">
          Professors: {professorCount}
        </div>
      </div>
    </Link>
  )
}
export default CourseCard

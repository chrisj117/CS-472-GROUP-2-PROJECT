import { useEffect, useState } from "react"
import SquareRating from "./SquareRating"
import { Link } from "react-router-dom"

const CourseCard = ({
  courseSubject,
  courseTitle,
  catalogNumber,
  professorCount,
}) => {
  return (
    <Link to={`reviews/${courseSubject + catalogNumber}`}>
      <div className="border-2 px-6 py-2 rounded-md flex justify-between items-center text-lg dark:border-zinc-700">
        <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-300 basis-1/4 hover:underline">
          {courseSubject} {catalogNumber}
        </h4>
        <span className="overflow-ellipsis overflow-hidden text-left basis-1/2">
          {courseTitle}
        </span>
        <span className="overflow-ellipsis overflow-hidden basis-1/4 text-center">
          Professors: {professorCount}
        </span>
      </div>
    </Link>
  )
}
export default CourseCard

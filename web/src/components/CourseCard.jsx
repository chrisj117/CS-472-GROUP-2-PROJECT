/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"

const CourseCard = ({
  schoolId,
  courseSubject,
  courseTitle,
  catalogNumber,
  professorCount,
  courseId,
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/schools/${schoolId}/reviews/${courseId}`)
  }

  return (
    <button onClick={handleNavigate}>
      <div className="border-2 px-6 py-2 rounded-md justify-between items-center text-lg dark:border-zinc-700 flex flex-col lg:flex-row">
        <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 basis-1/4 hover:underline text-left">
          {courseSubject} {catalogNumber}
        </h4>
        <div className="overflow-ellipsis overflow-hidden text-left basis-1/2">
          {courseTitle}
        </div>
        <div className="overflow-ellipsis overflow-hidden basis-1/4 text-left">
          Professors: {professorCount}
        </div>
      </div>
    </button>
  )
}
export default CourseCard

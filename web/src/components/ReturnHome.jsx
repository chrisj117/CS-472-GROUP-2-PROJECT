import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const ReturnHome = () => {
  return (
    <div className="py-6">
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-10 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring flex gap-2 items-center"
      >
        <span>Return to home</span> <BsFillArrowRightCircleFill />
      </Link>
    </div>
  )
}

export default ReturnHome

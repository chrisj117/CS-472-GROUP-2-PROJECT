import Searchbar from "../components/Searchbar"
import QA from "../components/QA"
import { useEffect, useState } from "react"
import api from "../utilities/Axios"

const Home = () => {
  const [schools, setSchools] = useState([])
  const [courses, setCourses] = useState([])

  const fetchSchools = async () => {
    try {
      const response = await api.get("/school/")
      if (response && response.data) {
        const resultingArray = response.data.data.map((curr) => ({
          long_name: curr.long_name,
          short_name: curr.short_name,
          value: curr.short_name,
          label: curr.long_name,
        }))

        setSchools(resultingArray)
      }
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }

  const fetchCourses = async () => {
    // try {
    //   const response = await api.get("/schools/")
    //   if (response && response.data) {
    //     const resultingArray = response.data.data.map((curr) => ({
    //       long_name: curr.long_name,
    //       short_name: curr.short_name,
    //       value: curr.short_name,
    //       label: curr.long_name,
    //     }))
    //     setSchools(resultingArray)
    //   }
    // } catch (err) {
    //   if (err.response) {
    //     // Not in the 200 response range
    //     console.log(err.response.data)
    //     console.log(err.response.status)
    //     console.log(err.response.headers)
    //   } else {
    //     console.log(`Error: ${err.message}`)
    //   }
    // }
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return (
    <div className="overflow-auto flex flex-col justify-evenly min-h-[calc(100vh-98px)] max-w-screen-xl mx-auto">
      {/* Search bar */}
      <div className="flex-1 flex flex-col w-full justify-center items-center gap-4">
        <p className="sm:text-lg md:text-xl l:text-2xl xl:text-3xl font-bold text-center mx-14">
          Find your school below to leave an evaluation!
        </p>
        <Searchbar
          searchingSchools={true}
          className="w-full px-4"
          searchPlaceholder="Ex: University of Nevada, Las Vegas / UNLV"
          change={true}
          schools={schools}
        />
      </div>

      {/* Bottom of page: FAQ section */}
      <div className="w-full justify-center mx-auto mb-12 pt-4">
        <h1 className="sm:text-md md:text-l l:text-xl xl:text-2xl text-center no-underline text-grey-darkest hover:text-blue-dark mb-8 font-semibold">
          Frequently Asked Questions
        </h1>
        {/* Question/Answer Components */}
        <div className="flex flex-col gap-4 px-4">
          <QA
            question="Why are evaluations important?"
            answer="Evaluations provide a detailed review of a course that covers
              almost every aspect of the class, including workload, professors,
              textbooks, and more!"
          />
          <QA
            question="How can I contribute?"
            answer="You can leave your own course evaluations on a course page when
        pressing the Review button, and it will take you to a page where
        you can fill out a simple questionnaire. Sign ups are not
        required!"
          />
          <QA
            question="Why don't I see my school?"
            answer="You can send a request to add your school here! Your request may
        take 2 or more weeks to be processed."
          />
        </div>
      </div>
    </div>
  )
}
export default Home

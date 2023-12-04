import Searchbar from "../components/Searchbar"
import { BsFillEnvelopePaperFill } from "react-icons/bs"
import { SendSchoolInfo } from "../utilities/API"
import { useState } from "react"
import FormError from "../components/FormError"
import FormSuccess from "../components/FormSuccess"
import { BeatLoader } from "react-spinners"
import { useLoaderData } from "react-router-dom"
import { FaSearch } from "react-icons/fa"

const RequestSchool = () => {
  const [name, setName] = useState("")
  const [website, setWebsite] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { schools } = useLoaderData()

  const handleRequestSchool = async (e) => {
    e.preventDefault()

    if (!loading) {
      setLoading(true)
    } else return

    const response = await SendSchoolInfo({
      school_name: name,
      website: website,
    })

    if (typeof response === "string") {
      if (response.includes("ERROR:")) {
        setError(response.substring(7))
        setLoading(false)
        return
      }
    }

    setError("")

    setTimeout(() => {
      setSuccess(
        "School request successfully sent! Please wait up to 2 weeks for your request to be processed."
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="overflow-auto max-w-screen-xl mx-auto flex flex-col items-center min-h-[calc(100vh-98px)] px-4">
      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-12 mt-8">
        Request School
      </h2>
      <div className="w-full flex flex-col items-center gap-4">
        {/* Check if your school is already here */}
        <div className="mb-4 flex flex-col w-full">
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-4 text-center">
            <span className="font-bold text-blue-600">Wait!</span> Check if your
            school is already here:
          </p>
          <div className="flex gap-2 items-center justify-center max-w-screen-xl w-full">
            <FaSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
            <Searchbar
              searchingSchools={true}
              className="w-full"
              searchPlaceholder="Ex: University of Nevada, Las Vegas / UNLV"
              change={false}
              schools={schools}
            />
          </div>
        </div>
        {/* Request a School Form */}

        <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-4 text-center">
          If you can&apos;t find your institution above, submit your
          school&apos;s information below.
        </p>

        <form
          className="flex flex-col gap-3 w-full items-center justify-center"
          onSubmit={handleRequestSchool}
        >
          <div className="mb-4 w-full">
            <label className="flex flex-col gap-1 text-sm md:text-base lg:text-lg">
              Enter School Name
              <input
                type="text"
                placeholder="Ex: University of Nevada Las Vegas"
                className="px-3 py-1 w-full border-2 rounded truncate dark:bg-zinc-900 dark:border-zinc-600 dark:text-white focus:outline-transparent"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4 w-full">
            <label className="flex flex-col gap-1 text-sm md:text-base lg:text-lg">
              Enter School Website
              <input
                type="text"
                placeholder="Ex: https://www.unlv.edu/"
                className="px-3 py-1 w-full border-2 rounded truncate dark:bg-zinc-900 dark:border-zinc-600 dark:text-white focus:outline-transparent"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          {error || success ? (
            <>
              <FormError error={error} />
              <FormSuccess success={success} />
            </>
          ) : null}

          <button className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
            {loading ? (
              <BeatLoader color="#ffffff" size="10px" />
            ) : (
              <>
                <span className="font-semibold">Request School</span>{" "}
                <BsFillEnvelopePaperFill />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
export default RequestSchool

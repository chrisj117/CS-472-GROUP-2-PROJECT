/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async"
import { useEffect, useState } from "react"
import api from "../utilities/axios"

const Searchbar = ({
  searchingSchools,
  searchingCourses,
  searchPlaceholder,
  className,
}) => {
  const [schools, setSchools] = useState([])

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await api.get("/school/")
        if (response && response.data) setSchools(response.data.data)
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

    if (searchingSchools && !searchingCourses) {
      fetchSchools()
    } else if (searchingCourses && !searchingSchools) {
      // fetchCourses();
    } else {
      console.log(
        `Error: You cannot search for schools and courses at the same time!`
      )
    }
  }, [searchingCourses, searchingSchools])

  const loadOptions = (searchValue, callback) => {
    if (schools.length == 0) return

    setTimeout(() => {
      const filteredOptions = schools.filter(
        (option) =>
          option.short_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.long_name.toLowerCase().includes(searchValue.toLowerCase())
      )

      // console.log('loadOptions', searchValue, filteredOptions);
      callback(filteredOptions)
    }, 500)
  }

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption)
  }

  return (
    <div className={className}>
      <AsyncSelect
        loadOptions={loadOptions}
        cacheOptions
        placeholder={searchPlaceholder}
        defaultOptions
        onChange={handleChange}
      />
    </div>
  )
}
export default Searchbar

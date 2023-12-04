/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async"
import { useNavigate } from "react-router-dom"
import { useSchool } from "../pages/Root"

const Searchbar = ({
  searchingSchools,
  searchingCourses,
  searchPlaceholder,
  className,
  change,
  schools,
}) => {
  const navigate = useNavigate()

  const { setCurrentSchool } = useSchool()

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      if (searchingSchools) {
        const filteredOptions = schools.filter(
          (option) =>
            option.short_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            option.long_name.toLowerCase().includes(searchValue.toLowerCase())
        )

        console.log("loadOptions", searchValue, filteredOptions)
        callback(filteredOptions)
      }

      if (searchingCourses) {
        const filteredOptions = courses.filter(
          (option) =>
            option.short_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            option.long_name.toLowerCase().includes(searchValue.toLowerCase())
        )

        console.log("loadOptions", searchValue, filteredOptions)
        callback(filteredOptions)
      }
    }, 200)
  }

  const handleChange = (selectedOption) => {
    setCurrentSchool(selectedOption)
    navigate(`/schools/${selectedOption.short_name}`)
  }

  return (
    <div className={className}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder={searchPlaceholder}
        onChange={change ? handleChange : null}
      />
    </div>
  )
}
export default Searchbar

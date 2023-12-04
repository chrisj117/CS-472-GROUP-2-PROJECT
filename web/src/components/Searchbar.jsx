/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async"
import { useNavigate } from "react-router-dom"

const Searchbar = ({
  searchingSchools,
  searchingCourses,
  searchPlaceholder,
  className,
  change,
  schools,
  courses,
}) => {
  const navigate = useNavigate()

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

        callback(filteredOptions)
      }
    }, 200)
  }

  const handleChange = (selectedOption) => {
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

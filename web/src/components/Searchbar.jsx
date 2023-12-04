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
  school,
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
            option.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
            option.catalog_number
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            option.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        )

        callback(filteredOptions)
      }
    }, 250)
  }

  const handleChange = (selectedOption) => {
    if (searchingSchools) {
      navigate(`/schools/${selectedOption.short_name}`)
    }

    if (searchingCourses) {
      navigate(`/schools/${school}/reviews/${selectedOption.value}`)
    }
  }

  return (
    <div className={className}>
      <AsyncSelect
        defaultOptions
        loadOptions={loadOptions}
        placeholder={searchPlaceholder}
        onChange={change ? handleChange : null}
      />
    </div>
  )
}
export default Searchbar

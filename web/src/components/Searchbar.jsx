/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../pages/Root"

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
  const { darkMode } = useDarkMode()

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
        const filteredOptions = courses
          .filter(
            (option) =>
              option.subject
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              option.catalog_number
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              option.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
              option.label.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 10)

        callback(filteredOptions)
      }
    }, 250)
  }

  const handleChange = (selectedOption) => {
    if (searchingSchools) {
      navigate(`/schools/${selectedOption.short_name}`)
    }

    if (searchingCourses) {
      navigate(`/schools/${school.short_name}/reviews/${selectedOption.value}`)
    }
  }

  return (
    <div className={className}>
      <AsyncSelect
        defaultOptions
        loadOptions={loadOptions}
        placeholder={searchPlaceholder}
        onChange={change ? handleChange : null}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: darkMode == "true" ? "rgb(24 24 27)" : "white",
            borderColor:
              darkMode == "true" ? "rgb(82 82 91)" : "rgb(228 228 231)",
            loadingMessage: darkMode == "true" ? "white" : "black",
            padding: "0.25rem",
            borderWidth: "2px",
            color: darkMode == "true" ? "white" : "black",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: darkMode == "true" ? "white" : "black",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: darkMode == "true" ? "white" : "black",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? "rgb(37, 100, 235)"
              : darkMode == "true"
              ? "rgb(63 63 70)"
              : "",
            color: state.isFocused
              ? "white"
              : darkMode == "true"
              ? "white"
              : "black",
            borderColor:
              darkMode == "true" ? "rgb(82 82 91)" : "rgb(228 228 231)",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            overflowWrap: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: darkMode == "true" ? "rgb(24 24 27)" : "white",
            borderColor:
              darkMode == "true" ? "rgb(82 82 91)" : "rgb(228 228 231)",
            color: darkMode == "true" ? "white" : "black",
          }),
        }}
      />
    </div>
  )
}
export default Searchbar

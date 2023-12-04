import api from "../utilities/Axios"

export const getSchools = async () => {
  try {
    const response = await api.get("/school/")
    if (response && response.data) {
      const resultingArray = response.data.data.map((curr) => ({
        long_name: curr.long_name,
        short_name: curr.short_name,
        value: curr.short_name,
        label: curr.long_name,
      }))

      return resultingArray
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

export const getSchool = async (short_name) => {
  try {
    const response = await api.get(`/school/${short_name}`)
    if (response && response.data) {
      return response.data.data
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

export const getCourses = async (short_name) => {
  try {
    const response = await api.get(`/school/${short_name}/courses`)
    if (response && response.data) {
      const resultingArray = response.data.data.map((curr) => ({
        subject: curr.subject,
        title: curr.title,
        catalog_number: curr.catalog_number,
        value: curr.subject + curr.catalog_number,
        label: curr.subject + " " + curr.catalog_number + " " + curr.title,
      }))
      return resultingArray
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

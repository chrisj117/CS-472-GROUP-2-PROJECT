/* eslint-disable react-refresh/only-export-components */
import axios from "axios"

export default axios.create({
  baseURL: "https://cs-472-group-2-project-backend.vercel.app/api/v1",
})

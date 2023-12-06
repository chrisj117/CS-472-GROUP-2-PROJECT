import api from "./Axios";

export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await api.put(`/reviews/${reviewId}/`, updatedData);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.error('Response Error:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    throw err;
  }
}

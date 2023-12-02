/* eslint-disable react/prop-types */

const FormError = ({ error }) => {
  return error ? <p className="text-red-500 mb-4 mt-4">{error}</p> : null
}
export default FormError

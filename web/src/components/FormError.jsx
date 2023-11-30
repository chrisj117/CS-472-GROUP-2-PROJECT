const FormError = ({ error }) => {
  return error ? (
    <p className="text-red-500 mb-4 mt-4 text-lg">{error}</p>
  ) : null
}
export default FormError

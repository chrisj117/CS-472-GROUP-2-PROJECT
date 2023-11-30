const FormError = ({ error }) => {
  return error ? (
    <p className="text-red-500 mb-8 mt-8 text-lg">{error}</p>
  ) : null
}
export default FormError

const FormSuccess = ({ success }) => {
  return success ? (
    <p className="text-green-500 mb-4 mt-4 text-lg">{success}</p>
  ) : null
}
export default FormSuccess

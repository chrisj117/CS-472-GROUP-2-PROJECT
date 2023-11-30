const FormSuccess = ({ success }) => {
  return success ? (
    <p className="text-green-500 mb-8 mt-8 text-lg">{success}</p>
  ) : null
}
export default FormSuccess

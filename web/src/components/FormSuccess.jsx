/* eslint-disable react/prop-types */

const FormSuccess = ({ success }) => {
  return success ? <p className="text-green-500 mb-4 mt-4">{success}</p> : null
}
export default FormSuccess

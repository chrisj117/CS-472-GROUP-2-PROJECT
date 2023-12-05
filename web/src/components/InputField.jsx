/* eslint-disable react/prop-types */

const InputField = ({
  labelName,
  inputType,
  inputID,
  inputPlaceholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="mb-4">
        <label className="flex flex-col gap-1 text-lg">
          {labelName}
          <input
            type={inputType}
            id={inputID}
            placeholder={inputPlaceholder}
            className="px-3 py-2 w-full border-2 rounded truncate dark:bg-zinc-900 dark:border-zinc-600 dark:text-white focus:outline-transparent"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  )
}

export default InputField

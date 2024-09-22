/* eslint-disable react/prop-types */
function InputField({
  name,
  placeholder,
  error,
  onFocus,
  onChange,
  onBlur,
  value,
}) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        name={name}
        placeholder={placeholder}
        className={`w-full border-b-[1px] bg-gray p-3 caret-primary outline-none placeholder:opacity-60 ${
          error ? "border-red-500 border-opacity-60" : "border-secondary"
        } focus:border-white`}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <p className="absolute right-0 top-1/2 translate-y-[-50%] text-sm text-red-500 opacity-50">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;

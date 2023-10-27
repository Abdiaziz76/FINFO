const InputField = ({
    type,
    id,
    value,
    onChange,
    placeholder,
    darkMode,
    className,
  }) => (
    <>
   {type === "textarea" ? 
   <textarea
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`dark:bg-gray-700 p-5 rounded-md outline-blue-500 border border-grey-200 bg-slate-300 placeholder-slate-500 dark:placeholder-slate-400 text-black dark:text-white font-semibold ${className} w-full`}
    /> : (
      <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`dark:bg-gray-700 p-5 rounded-md outline-blue-500 border border-grey-200 bg-slate-300 placeholder-slate-500 dark:placeholder-slate-400 text-black dark:text-white font-semibold ${className} w-full`}
    />
    )}
    </>
  );

  export default InputField;
  
const Button = ({ onClick, label, icon, darkMode, className, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex ${disabled === true  ?'cursor-not-allowed bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-400' : ''} ${label === 'Next' ? ' flex-row-reverse' : ''} ${label === 'Remove' ? 'text-red-700 text-xl p-0 self-center' : 'p-2  sm:px-4 sm:py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 text-white'} gap-3 items-center   self-end rounded-md  font-semibold ${className}`}
    >
      {icon} {label === 'Remove' ? '': label} 
    </button>
  );

  export default Button;
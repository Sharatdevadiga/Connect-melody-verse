/* eslint-disable react/prop-types */
function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1 rounded-md bg-primary px-3 py-1 text-body-s transition-all hover:bg-red-500 active:scale-90 xs:text-body-m"
    >
      {children}
    </button>
  );
}

export default Button;

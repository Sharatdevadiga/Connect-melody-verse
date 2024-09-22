/* eslint-disable react/prop-types */
function Loader({ size = "large", type = "fullScreen" }) {
  const typeStyles =
    type === "fullScreen" ? " md:w-[90%] h-screen w-screen" : "h-full w-full";
  const sizeStyles =
    size === "large" ? "h-16 w-16 border-4" : "h-6 w-6 border-2";

  return (
    <div className={`${typeStyles} flex items-center justify-center`}>
      <div
        className={`${sizeStyles} animate-spin rounded-full border-blue-50 border-l-transparent`}
      ></div>
    </div>
  );
}

export default Loader;

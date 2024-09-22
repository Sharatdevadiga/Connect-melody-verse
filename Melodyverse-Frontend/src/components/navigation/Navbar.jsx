import { NavLink } from "react-router-dom";
import Logo from "../general/Logo";

function Navbar() {
  return (
    <div className="w-full absolute top-0 p-3 flex items-center justify-between bg-black bg-opacity-50 backdrop:blur-md">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex gap-3">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
    </div>
  );
}

export default Navbar;

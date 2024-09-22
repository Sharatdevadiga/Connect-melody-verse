import { NavLink } from "react-router-dom";
import Button from "../components/general/Button";
import Navbar from "../components/navigation/Navbar";

function Home() {
  return (
    <main className="home-bg">
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="sm:text-heading-l md:text-[64px]">
            Tune into your wibe
          </h1>
          <p className="">Discover a world of music tailored just for you.</p>
        </div>
        <NavLink
          to="/login"
          className="flex items-center justify-center gap-1 rounded-md bg-primary px-6 py-1 text-body-s transition-all hover:rounded-full active:scale-90 xs:text-body-m"
        >
          Start Listening Now
        </NavLink>
      </div>
    </main>
  );
}

export default Home;

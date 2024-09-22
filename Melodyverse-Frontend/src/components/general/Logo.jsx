// import { SiMusicbrainz } from "react-icons/si";
import { PiMusicNotesMinusFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <PiMusicNotesMinusFill className="h-6 w-6 text-primary md:h-8 md:w-8"></PiMusicNotesMinusFill>
      {/* <SiMusicbrainz className="h-6 w-6 text-primary md:h-8 md:w-8"></SiMusicbrainz> */}
    </NavLink>
  );
}

export default Logo;

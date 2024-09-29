import { Link } from "react-router-dom";
import logo from "../images/logo.png";
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token_exp");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center sm:justify-between sm:flex-row py-5">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" width="100" />
        </Link>
      </div>
      <div>
        <ul className="sm:flex hidden gap-5">
          <li className="navlink">
            <Link to="/home">Drama</Link>
          </li>
          <li className="navlink">
            <Link to="/home">Action</Link>
          </li>
          <li className="navlink">
            <Link to="/home">Sci-Fi</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="navlink">
                <Link to="/bookings">My booking</Link>
              </li>
              <li>
                <button className="button-design" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <button className="button-design">Signup</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="button-design">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

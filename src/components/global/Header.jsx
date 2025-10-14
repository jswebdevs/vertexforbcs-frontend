import { Link } from "react-router";
import logo from "../../assets/img/logo.png";

const Header = () => {
  const links = (
    <>
      <li className="text-black hover:text-green-600 font-semibold transition-colors duration-200">
        <Link to="/">Home</Link>
      </li>
      <li className="text-black hover:text-green-600 font-semibold transition-colors duration-200">
        <Link to="/about">About</Link>
      </li>
      <li className="relative group text-black hover:text-green-600 font-semibold transition-colors duration-200">
        <Link to="/properties">Properties</Link>
        {/* Submenu */}
        <ul className="absolute left-0 top-full hidden w-40 bg-white shadow-lg rounded-lg group-hover:block z-50 p-1">
          <li className="text-black hover:bg-green-100 py-2 px-3 rounded transition-colors duration-200">
            <Link to="/lands">Lands</Link>
          </li>
          <li className="text-black hover:bg-green-100 py-2 px-3 rounded transition-colors duration-200">
            <Link to="/flats">Flats</Link>
          </li>
          <li className="text-black hover:bg-green-100 py-2 px-3 rounded transition-colors duration-200">
            <Link to="/houses">Houses</Link>
          </li>
        </ul>
      </li>
      <li className="text-black hover:text-green-600 font-semibold transition-colors duration-200">
        <Link to="/services">Services</Link>
      </li>
      <li className="text-black hover:text-green-600 font-semibold transition-colors duration-200">
        <Link to="/contact">Contact Us</Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-md">
      <div className="px-[5%]">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full py-4">
              <div className="flex-1">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-16" />
                </Link>
              </div>

              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-outline text-black hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>

              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal gap-6">{links}</ul>
              </div>
            </div>
          </div>

          {/* Sidebar menu (mobile) */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 p-6 bg-white gap-4">{links}</ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Docs", path: "/docs" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky w-full top-0 bg-zinc-900 shadow-md px-4 py-3 flex  justify-between items-center">
      <div className="text-xl font-bold text-blue-600">PeakyBot</div>
      <div className="md:hidden">
        <button onClick={() => setOpen((prev) => !prev)} className="text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul
        className={` md:flex md:space-x-6 absolute md:static bg-gray-900 md:bg-transparent ${
          setOpen ? "w-full" : null
        } left-0 px-6 md:px-0 transition-all duration-300 ease-in ${
          open ? "top-14" : "-top-96"
        }`}
      >
        {links.map((link) => (
          <li key={link.name} className="my-2  md:my-0">
            <Link
              to={link.path}
              className="text-white hover:text-blue-600 block"
              onClick={() => setOpen((prev) => !prev)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

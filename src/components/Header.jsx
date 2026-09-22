import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

import { UserContext } from '../context/userContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const navLinks = currentUser
    ? [
      { to: `/profile/${currentUser.id}`, label: currentUser.name, capitalize: true },
      { to: '/create', label: 'Share recipe' },
      { to: '/authors', label: 'Authors' },
      { to: '/logout', label: 'Logout' },
    ]
    : [
      { to: '/authors', label: 'Authors' },
      { to: '/login', label: 'Login' },
    ];

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="mr-2 h-12 md:h-16" />
        </Link>

        <button
          className="z-20 text-gray-700 focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
        </button>

        <ul
          className={`${isOpen ? 'fixed inset-0 z-10 flex flex-col items-center justify-center space-y-8 bg-white' : 'hidden'
            } md:flex md:space-x-8`}
        >
          {navLinks.map(({ to, label, capitalize }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-gray-700 hover:text-[#C99A44] ${capitalize ? 'capitalize' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
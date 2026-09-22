import logo from '../assets/logo_white.png';

const links = ['Home', 'Recipes', 'About us', 'Contact'];

const Footer = () => {
  return (
    <footer className="bg-[#1F2A22] text-[#FBF6EE]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8 md:flex-row md:justify-between">
        <div className="max-w-xs text-center md:text-left">
          <img src={logo} alt="Kitchen Chronicles" className="h-16 object-contain" />
          <p
            className="mt-4 text-sm leading-relaxed text-[#FBF6EE]/60"
          >
            Recipes tested in a real kitchen, written so you'll actually
            want to cook them again.
          </p>
        </div>

        <nav
          className="flex flex-col items-center gap-3 text-sm md:items-start"
        >
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="text-[#FBF6EE]/70 transition-colors hover:text-[#C99A44]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#FBF6EE]/10 px-6 py-6 text-center text-xs text-[#FBF6EE]/40">
        © {new Date().getFullYear()} Kitchen Chronicles. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
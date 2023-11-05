const Footer = () => {
  return (
    <footer className="text-center left-0 z-20 w-full p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800 border-gray-600">
      <span className="text-sm sm:text-center text-gray-400">
        2023 created by ika71
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
        <li className="mx-auto">
          <a
            href="https://github.com/ika71/graduation-project-spring"
            target="_blank"
            className="mr-4 hover:underline md:mr-6"
          >
            github
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

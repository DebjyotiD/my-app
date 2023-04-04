import React from "react";

function Footer() {
  return (
    <div style={{userSelect:"none"}}>
      <div className="fixed bottom-0 right-0 bg-gray-100 py-2 px-2 rounded-lg">
        <p className="text-center text-gray-500">
          A mini project by Debjyoti Das Ghosh
        </p>
      </div>
      <div className="transform transition-all duration-300 hover:scale-150 fixed bottom-0 left-0 bg-gray-100 w-45">
        <a
          href="https://github.com/DebjyotiD"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.3.9.1-.8.4-1.2.8-1.5-2.9-.3-6-1.5-6-6.8 0-1.5.5-2.7 1.4-3.7-.2-.3-.6-1.8 0-3.7 0 0 1.2-.4 3.8 1.4a13 13 0 017 0c2.6-1.8 3.8-1.4 3.8-1.4.6 1.9.2 3.4 0 3.7.9 1 1.4 2.3 1.4 3.7 0 5.3-3.1 6.4-6 6.8.5.4.8 1  .8 2.1v3.2c0 .3.2.7.8.6A12 12 0 0012 0z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Footer;

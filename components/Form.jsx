// /components/Form.jsx

import React from 'react';

const Form = ({
  children,
  onSubmit,
  title,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 mx-8 bg-black shadow md:mx-0 rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          <div className="flex items-center justify-center space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={150}
              height="auto"
              viewBox="0 0 397 94"
              fill="none"
            >
              {/* Seus paths SVG aqui */}
              {/* ... */}
            </svg>
          </div>
          <div className="mt-5">
            {title && (
              <h2 className="mb-5 text-2xl font-semibold text-center">
                {title}
              </h2>
            )}
            <form onSubmit={onSubmit}>
              {children}
              {footerText && footerLink && (
                <div className="flex items-center justify-center mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                  <a
                    href={footerLink}
                    className="ml-2 mr-2 text-xs font-semibold text-gray-500 uppercase font-display dark:text-gray-400 hover:underline"
                  >
                    {footerLinkText}
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

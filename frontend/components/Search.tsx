import React from 'react';

const Search = () => {
  return (
    <label className="relative block w-60 items-center">
      <span className="sr-only">Search</span>
      <span className="absolute h-[90%] top-0 left-0 flex items-center pl-2">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        className="placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm"
        placeholder="Pesquisar..."
        type="text"
        name="search"
      />
    </label>
  );
};

export default Search;

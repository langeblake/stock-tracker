"use client";

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export const Search = ({ setQuery }) => {
  const [text, setText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toUpperCase();
    setText(query);
    setQuery(query);
  };

  // const handleSearch = () => {
  //   setQuery(text);
  // };

  const handleClear = () => {
    setText("");
    setQuery("");
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <FiSearch className="dark:text-gray-400" />
      </span>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Search for a symbol"
        className="pl-10 pr-10 border h-10 rounded-md border-zinc-700 bg-zinc-100 dark:bg-black w-64 focus:border-none"
      />
      {text && (
        <span
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={handleClear}
        >
          <FiX className="dark:text-gray-400" />
        </span>
      )}
    </div>
  );
};

export default Search;

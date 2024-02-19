'use client'
import { useState, ChangeEvent } from 'react';

const SearchBar = ({ setSearchQuery }: { setSearchQuery: (query: string) => void }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  return (
    <div className="flex-center">
      <input
        type="text"
        onChange={handleChange}
        className="input-field w-[590px] bg-light-gray text-primary p-bold-16"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;

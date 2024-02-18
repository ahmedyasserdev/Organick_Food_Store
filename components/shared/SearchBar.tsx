'use client'
import  {  ChangeEvent } from 'react'

const SearchBar = ({ searchQuery , setSearchQuery}: { searchQuery: string | undefined}) => {
  const  handleChange  =  (e: ChangeEvent<HTMLInputElement>) =>   {
    setSearchQuery(e.target.value);


};

  
  

  return (
    <div className="flex-center ">
      <input type="text" value={searchQuery}  onChange={handleChange} className ="input-field w-[590px] bg-light-gray text-primary p-bold-16 "  placeholder='Search...'  />
    </div>
  );
};

export default SearchBar;

import React from 'react';
import GooglePlacesAutoCompleteComponent from './GooglePlacesAutoComplete';
import { DatePickerWithRange } from './DatePickerWithRange';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <div className='flex flex-row justify-start items-start overflow-x-auto scrollbar-hide p-5 gap-5'>
      <GooglePlacesAutoCompleteComponent />
      <DatePickerWithRange />
      <div className='flex items-center justify-center bg-blue-600 text-white p-2 rounded-full h-10 w-10'>
        <FaSearch />
      </div>
    </div>
  );
};

export default Search;
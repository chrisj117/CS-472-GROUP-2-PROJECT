import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';

const Searchbar = ({ schools, courses }) => {
  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter(
        (option) =>
          option.short_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.long_name.toLowerCase(searchValue.toLowerCase())
      );

      console.log('loadOptions', searchValue, filteredOptions);
      callback(filteredOptions);
    }, 2000);
  };

  const handleChange = (selectedOption) => {
    console.log('handleChange', selectedOption);
  };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions
      onChange={handleChange}
    />
  );
};
export default Searchbar;

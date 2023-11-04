/* eslint-disable react/prop-types */
import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';
import api from '../utilities/schools';

const Searchbar = ({ searchingSchools, searchingCourses }) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await api.get('/school');
        if (response && response.data) setSchools(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    if (searchingSchools && !searchingCourses) {
      fetchSchools();
    } else if (searchingCourses && !searchingSchools) {
      // fetchCourses();
    } else {
      console.log(
        `Error: You cannot search for schools and courses at the same time!`
      );
    }
  }, []);

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = schools.filter(
        (option) =>
          option.short_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.long_name.toLowerCase().includes(searchValue.toLowerCase())
      );

      // console.log('loadOptions', searchValue, filteredOptions);
      callback(filteredOptions);
    }, 500);
  };

  const handleChange = (selectedOption) => {
    console.log('handleChange', selectedOption);
  };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      cacheOptions
      defaultOptions
      onChange={handleChange}
    />
  );
};
export default Searchbar;

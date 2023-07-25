import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';

import './search.css';

const Search = ({ onSearchChange, tempUnit, favouriteToShow }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((location) => {
            return {
              value: `${location.latitude} ${location.longitude}`,
              label: `${location.name}, ${location.region}, ${location.country}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  useEffect(() => {
    handleOnChange(search);
  }, [tempUnit]);

  useEffect(() => {
    handleOnChange(favouriteToShow);
  }, [favouriteToShow]);

  return (
    <AsyncPaginate
      className="search-bar"
      placeholder="Search for city..."
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;

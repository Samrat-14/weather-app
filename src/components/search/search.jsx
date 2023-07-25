import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';
import { onSearchChange } from '../../redux/searchAction';
import { useDispatch } from 'react-redux';

import './search.css';

const Search = ({ tempUnit, favouriteToShow, isGps }) => {
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(onSearchChange({ ...searchData, tempUnit }));
  };

  useEffect(() => {
    handleOnChange(search);
  }, [tempUnit]);

  useEffect(() => {
    handleOnChange(favouriteToShow);
  }, [favouriteToShow]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      handleOnChange({
        value: `${pos.coords.latitude} ${pos.coords.longitude}`,
        label: 'Your location',
      });
    });
  }, [isGps]);

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

import { useState } from 'react';

export default function useApplicationData() {

  const [state, setState] = useState({
    searchData: "",
    city: "",
    weatherData: null,
    errorMsg: ""
  })

  const setSearchData = value => {
    setState(prev => ({ ...prev, searchData: value }));
  };
  const setCity = value => {
    setState(prev => ({ ...prev, city: value }));
  };
  const setWeatherData = value => {
    setState(prev => ({ ...prev, weatherData: value }));
  };
  const setErrorMsg = value => {
    setState(prev => ({ ...prev, errorMsg: value }));
  };

  return { state, setSearchData, setCity, setWeatherData, setErrorMsg }
};
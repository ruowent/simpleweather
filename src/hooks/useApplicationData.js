import { useState } from 'react';

export default function useApplicationData() {

  const [state, setState] = useState({
    formInput: "",
    searchData: "",
    weatherData: null,
    errorMsg: ""
  })

  const setFormInput = value => {
    setState(prev => ({ ...prev, formInput: value }));
  };
  const setSearchData = value => {
    setState(prev => ({ ...prev, searchData: value }));
  };
  const setWeatherData = value => {
    setState(prev => ({ ...prev, weatherData: value }));
  };
  const setErrorMsg = value => {
    setState(prev => ({ ...prev, errorMsg: value }));
  };

  return { state, setFormInput, setSearchData, setWeatherData, setErrorMsg }
};
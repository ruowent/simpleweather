import './App.css';

function App() {
  const [searchData, setSearchData] = useState({
    city: ""
  });
  const onSubmit = (searchData) => {
    setCurrentCity(searchData.city)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;

    setSearchData({ ...searchData, [name]: value });
  };
  return (
    <div className="App">
      Weather app
      <form className="weather-search" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter a city name"
          value={searchData.city}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default App;

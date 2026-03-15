import { MenuItem, FormControl, Select } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();

      const countries = data
        .filter((country) => country.countryInfo.iso2) // remove null iso2
        .map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

      setCountries(countries);
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Dropdown */}
      {/* InfoBoxes */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;

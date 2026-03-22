import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import "./App.css";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // ✅ Map states
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  // 🌍 Load worldwide data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/all");
      const data = await res.json();
      setCountryInfo(data);
    };
    fetchData();
  }, []);

  // 🌍 Load countries
  useEffect(() => {
    const getCountriesData = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await res.json();

      const countries = data
        .filter((c) => c.countryInfo.iso2)
        .map((c) => ({
          name: c.country,
          value: c.countryInfo.iso2,
        }));

      setCountries(countries);
      setTableData(sortData(data));
    };

    getCountriesData();
  }, []);

  // 🌍 Dropdown change
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const res = await fetch(url);
    const data = await res.json();

    setCountryInfo(data);

    // ✅ Safe map update
    if (countryCode === "worldwide") {
      setMapCenter([20, 0]);
      setMapZoom(2);
    } else if (data?.countryInfo) {
      setMapCenter([
        data.countryInfo.lat,
        data.countryInfo.long,
      ]);
      setMapZoom(4);
    }
  };

  return (
    <div className="app">
      {/* LEFT */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app_dropdown">
            <Select value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* STATS */}
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* MAP */}
        <Map center={mapCenter} zoom={mapZoom} />
      </div>

      {/* RIGHT */}
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
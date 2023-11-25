import React, { useState } from 'react';
import './Country.css'
const CountriesByCurrency = () => {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountriesByCurrency = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        setCountryData(data);
        setError('');
      } else {
        setCountryData([]);
        setError('No countries found for this currency code.');
      }
    } catch (error) {
      setError('Error fetching data. Please try again.');
      setCountryData([]);
  
  } finally {
    setLoading(false);
  }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (currencyCode) {
      await fetchCountriesByCurrency();
    } else {
      setError('Please enter a currency code.');
      setCountryData([]);
    }
  };

  return (
    <div>
      <h2 className="animate-charcter">Find Countries by Currency</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="(e.g.INR, USD)"
          value={currencyCode}
          onChange={e => setCurrencyCode(e.target.value.toUpperCase())}
        />
        <span class="caret"></span>&nbsp;&nbsp;
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {countryData.map((country, index) => (
          <div key={index} style={{ margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',textAlign: 'center', width: '350px',marginTop: '4%' }}>
            <img
              src={`https://flagcdn.com/64x48/${country.cca2.toLowerCase()}.png`}
              alt={`${country.name.common} Flag`}
              style={{ maxWidth: '100%', height: 'auto', marginTop:'10px' }}
            />
            <p className="animate-charcterr">Country Name : {country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesByCurrency;

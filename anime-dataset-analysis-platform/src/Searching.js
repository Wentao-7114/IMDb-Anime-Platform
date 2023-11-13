// Searching.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Searching.css'; // Importing the CSS file

function Searching() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getAnimeInfo')
      .then(response => {
        console.log(response.data); // Check the structure of the response data
        setAnimes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Searching</h1>
      <div className="animeList">
        {animes.map((item, index) => (
          <div key={index} className="animeItem">
            <h3>{item.title.value}</h3>
            <img src={item.url.value} alt={item.title.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searching;

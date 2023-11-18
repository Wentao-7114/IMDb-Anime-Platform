// Searching.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Searching.css'; // Importing the CSS file
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Searching() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let location = useLocation();
  const username = location.state.currentusername;
  const password = location.state.currentpassword;
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getAnimeInfo')
      .then(response => {
        console.log(response.data); // Check the structure of the response data
        setAnimes(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar value={{currentusername:username, currentpassword:password}}></Navbar>
      <h1>Searching</h1>
      <SearchBar data={animes} setFilteredData={setFilteredData} />
      <div className="animeList">
        {filteredAnimes.map((item, index) => (
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

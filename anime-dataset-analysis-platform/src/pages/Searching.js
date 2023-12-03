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

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/getAnimeInfo')
  //     .then(response => {
  //       console.log(response.data); // Check the structure of the response data
  //       setAnimes(response.data);
  //       setFilteredData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const [userId, setUserId] = useState(null);

// useEffect(() => {
//   const fetchUserId = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/getUserId', {
//         username: username,
//         password: password
//       });
//       console.log(response.data.userId);
//       setUserId(response.data.userId);
//     } catch (error) {
//       console.error('Error fetching userId:', error);
//     }
//   };

//   fetchUserId();
// }, [username, password]);

useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/getUserId', {
        username: username,
        password: password
      });

      return response.data.userId;
    } catch (error) {
      console.error('Error fetching userId:', error);
      return null;
    }
  };

  const fetchAnimeInfo = async (userId) => {
    try {
      // Adjust this call if you need to use userId
      const response = await axios.get('http://localhost:3001/api/getAnimeInfo');
      setAnimes(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching anime data:', error);
    }
  };

  const init = async () => {
    const userId = await fetchUserId();
    setUserId(userId);
    if (userId) {
      await fetchAnimeInfo(userId);
      console.log(userId);
    }
  };

  init();
}, [username, password]); // Depend on username and password

 console.log(userId);
  const addToFavorites = (userId, animeId) => {
    axios.post('http://localhost:3001/api/addToFavorites', {
      userId: userId,
      animeId: animeId
    })
    .then(response => {
      // Handle successful addition
      alert('successfully added to your favorite list!')
      console.log('Added to favorites:', response.data);
    })
    .catch(error => {
      // Handle error
      console.log(userId);
      console.log(animeId);
      console.error('Error adding to favorites:', error);
    });
  };
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
            <button className="add-to-fav-btn" onClick={() => addToFavorites(userId, item.id.value)}>
            Add to Favorites
          </button>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default Searching;

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

  const fetchFavoriteAnime = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getFavoriteAnime/${userId}`);
      setAnimes(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching favorite anime:', error);
    }
  };

  const init = async () => {
    const userId = await fetchUserId();
    setUserId(userId);
    if (userId) {
      console.log("correct");
      console.log(userId);
      await fetchFavoriteAnime(userId);
      console.log(userId);
    }
  };

  init();
}, [username, password]); // Depend on username and password

 console.log(userId);
  const deleteFromFavorites = (userId, animeId) => {
    axios.post('http://localhost:3001/api/deleteFromFavorites', {
      userId: userId,
      animeId: animeId
    })
    .then(response => {
      // Handle successful addition
      alert('successfully deleted from your favorite list!')
      console.log('delete from favorites:', response.data);
    })
    .catch(error => {
      // Handle error
      console.log(userId);
      console.log(animeId);
      console.error('Error deleting from favorites:', error);
    });
  };
  return (
    <div>
      <Navbar value={{currentusername:username, currentpassword:password}}></Navbar>
      <h1>Favorite List</h1>
      <SearchBar data={animes} setFilteredData={setFilteredData} />
      <div className="animeList">
        {filteredAnimes.map((item, index) => (
          <div key={index} className="animeItem">
            <h3>{item.title.value}</h3>
            <img src={item.url.value} alt={item.title.value} />
            <button className="delete-from -fav-btn" onClick={() => deleteFromFavorites(userId, item.id.value)}>
            Delete It
          </button>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default Searching;

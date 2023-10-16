import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeList = () => {
    const [animeData, setAnimeData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/anime')  // Replace with your Flask API endpoint
            .then(response => {
                setAnimeData(response.data);
            })
            .catch(error => {
                setError("Error fetching the anime data");
            });
    }, []);

    return (
        <div>
            <h1>Anime List</h1>
            {error ? <p>{error}</p> : null}
            <ul>
                {animeData.map(anime => (
                    <li key={anime.id}>{anime.title} - {anime.rating}</li>
                ))}
            </ul>
        </div>
    );
}

export default AnimeList;

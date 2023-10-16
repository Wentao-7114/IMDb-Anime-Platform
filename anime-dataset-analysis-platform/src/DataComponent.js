import React, { useState, useEffect } from 'react';

function DataComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Adjust the URL below to match your Flask API endpoint
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h1>Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default DataComponent;

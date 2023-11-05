import React, { useState } from 'react'; 
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/register', {
                username: username,
                password: password
            }); 

            if (response.status === 201) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            alert('Error during registration');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
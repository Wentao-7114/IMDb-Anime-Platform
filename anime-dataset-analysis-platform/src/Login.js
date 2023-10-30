// import React, { useState } from 'react'; 
// import axios from 'axios';
// function Login(props) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     if (username === 'admin' && password === 'password') {
//     //         props.onLogin();
//     //     } else {
//     //         alert('Invalid credentials');
//     //     }
//     // }
//     // const skipLogin = () => {
//     //     props.onSkip();
//     // }
//     const registerUser = async (username, password) => {
//         try {
//             console.log('step1');
//             const response =  axios.post('http://localhost:3000/api/register', {
//                 username: username,
//                 password: password
//             }); 
//             console.log('step2');

//             if (response.status === 201) {
//                 // Registration successful
//                 console.log('User registered successfully');
//                 // Show a success message to the user

//                 alert('Registration successful');
//             } else {
//                 // Handle registration error
//                 console.error('Registration failed');
//                 // Show an error message to the user
//                 alert('Registration failed');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             // Show an error message to the user
//             alert('Error during registration');
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const username = event.target.username.value;
//         const password = event.target.password.value;

//         // Call the registerUser function
//         registerUser(username, password);
//     };

//     return (
//         <div>
//             {/* <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     placeholder="Username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <button onClick={skipLogin}>Continue as Guest</button> */}
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="username" placeholder="Username" required />
//                 <input type="password" name="password" placeholder="Password" required />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
        
        
//     );
// }

// export default Login;













import React, { useState } from 'react'; 
import axios from 'axios';

function App() {
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

export default App;

// design the login and log out page without the backend
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameerror, setUsernameerror] = useState('');
    const [passworderror, setPassworderror] = useState('');

    const navigate = useNavigate();
    const onButtonClick = () => {
        setPassworderror("")
        setUsernameerror("")
        
        if (""== password) {
            setPassworderror('Please enter a password')
            return
        }
        if ("" == username) {
            setUsernameerror("Please enter a username")
            return
        }
        if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {   // password should be at least three character
            setUsernameerror("Please enter a valid username")
            return
        }
        axios.post('http://localhost:3001/api/login', { username:username, password:password })
            .then(response => {
                console.log(response.data); // Login successful
                navigate('/mainpage');
            })
            .catch(error => {
                console.error('Error:', error.response.data.message);
                
                // Handle login failure (e.g., set an error state and display it)
            }); 
    }
    const onButtonClick2 = () => {
        navigate('/')
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your username here"
                onChange={ev => setUsername(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameerror}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passworderror}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick2}
                value={"Back"} />
        </div>
    </div>
}

export default Login




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




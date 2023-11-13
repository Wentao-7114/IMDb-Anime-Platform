// import React from 'react';
// import React, { useState, useEffect } from 'react';
// import Login from './Login';
// import './App.css';
// import AnimeList from './AnimeList';
// import DataComponent from './DataComponent';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false); // user not log in
//   useEffect(() => {
//     // check whether currently log in or not
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//         setLoggedIn(true);
//     }
//   }, []);
//   const handleLogin = () => {
//       setLoggedIn(true);
//   }
//   const handleSkip = () => {
//     setLoggedIn(true);
//   }
//   const handleLogout = () => {
//     setLoggedIn(false);
//     localStorage.removeItem('isLoggedIn'); // delete the symbol for already logged in
//   }
//   if (!loggedIn) {
//       return <Login onLogin={handleLogin} onSkip={handleSkip}/>;
//   }
//   return (
//     <div className="App">
//       <AnimeList />
//       <DataComponent />
//       <button onClick={handleLogout}>Logout</button> {/* log out and go back to log in page */}
//     </div>
//   );
// }

// export default App;







import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Home from './Home';
import Mainpage from './mainpage';
import Register from './Register';
import Searching from './Searching';
import Aboutme from './Aboutme';
import './App.css';
import  { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // user not log in
  const [username, setUsername] = useState("")
  return (
    <div className="App login-background"> {/* Add the background class here */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/mainpage" element={< Mainpage/>} />
          <Route path="/Login" element={<div className="login-form"><Login setLoggedIn={setLoggedIn} setEmail={setUsername} /></div>} /> {/* Wrap Login with a styled div */}
          <Route path="/Register" element={<Register />} />
          <Route path='/Searching' element={<Searching />} />
          {/* <Route path='/pokemon/:name' element={<PokemonDetailsPage/>} /> */}
          <Route path="/Aboutme" element={<Aboutme />} />
        </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
















// import React from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput
// }
// from 'mdb-react-ui-kit';
// function App() {
//   return (
//     <MDBContainer fluid>
//       <MDBRow>

//         <MDBCol sm='6'>

//           <div className='d-flex flex-row ps-5 pt-5'>
//             <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
//             <span className="h1 fw-bold mb-0">Logo</span>
//           </div>

//           <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

//             <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

//             <MDBInput wrapperClass='mb-4 mx-5 w-100' label='User name' id='formControlLg' type='username' size="lg"/>
//             <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

//             <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
//             <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
//             <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

//           </div>

//         </MDBCol>

//         <MDBCol sm='6' className='d-none d-sm-block px-0'>
//           <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
//             alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
//         </MDBCol>

//       </MDBRow>

//     </MDBContainer>
//   );
// }

// export default App;
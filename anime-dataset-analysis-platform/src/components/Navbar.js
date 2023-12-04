import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const username = props.value.currentusername;
  const password = props.value.currentpassword;

  return (
      <div className="navbar">
      <div className="leftSide">
        <p> Welcome! {username}</p>
      </div>
      <div className="rightSide">
      <Link to="/mainpage" state={{currentusername:username, currentpassword:password}}> Home </Link>
          <Link to="/mainpage/Searching" state={{currentusername:username, currentpassword:password}}> Search </Link>
          <Link to="/mainpage/Aboutme" state={{currentusername:username, currentpassword:password}}> AboutMe </Link>
          <Link to="/ ">Log out</Link>
      </div>
    </div>
    
  );
}

export default Navbar;
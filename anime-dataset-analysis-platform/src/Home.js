import React from "react"
import {useNavigate} from "react-router-dom"

const Home = (props) => {
    const { loggedIn, username } = props
    const navigate = useNavigate();
    // const handleLoginLogoutClick = () => {
    //     if (loggedIn) {
    //         setLoggedin(false);
    //     } else {
    //         navigate('/Login');
    //     }
    // }
    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/Login")
        }
    }
    const onButtonClick2 = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/Register")
        }
    }

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome to our Anime Data Analysis Platform!</div>
        </div>
        <div>
            This is the home page.
        </div>
        
        <div className={"buttonContainer"}>
        <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick2}
                value={"Register"} />
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={loggedIn ? "Log out" : "Log in"} />

            {(loggedIn ? <div>
                Your user account is {username}
            </div> : <div/>)}
        </div>


    </div>
}

export default Home
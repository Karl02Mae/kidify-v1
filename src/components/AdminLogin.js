import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import WordLogo from './img/ITM_Word_Logo.png'
import { auth } from '../firebase';
import './AdminLogin.css';

function AdminLogin() {
    const history = useHistory("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            history.push("/")
        }).catch((e) => {
            if (e.message === "Firebase: The email address is badly formatted. (auth/invalid-email).") {
                alert("Incorrect Email or Password. Please check your credentials again.")
            }
            else if (e.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                alert("Please check your credentials again.")
            }
            else {
                alert(e.message);
            }
        })
    }


    return (
        <div className="login">
            {/* <img src={WordLogo} className="login_logo" alt="Logo" /> */}
            <div className="login_container">
                <h3>Log In to KIDIFY!</h3>
                <form>
                    <center>
                        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                    </center>
                    <center>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </center>
                    <center>
                        <button onClick={login} type="submit" className="login_login">
                            Log In
                        </button>
                    </center>
                    <center>
                        <div className="sideInfo">
                            <h5>Forgot Password ?</h5>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import './AdminLogin.css';
import { Helmet } from 'react-helmet';
// import ChurchLogo from '../imgs/Church_Logo.png';

function AdminLogin() {
    const history = useHistory("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            const push = () => {
                history.push('/');
            }
            if (authUser) {
                //user has logged in
                push();
            } else {
                //user is logged out
                console.log('Log in!')
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            alert('Logged in successfully!')
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

    const forgotPass = () => {
        if (email === '') {
            const promptEmail = window.prompt('Enter your email');
            if (promptEmail === null) {
                return;
            }
            auth.sendPasswordResetEmail(promptEmail);
            alert('Reset Email Sent!')
        } else {
            alert('Cancelled!');
        }
    }


    return (
        <div className="login">
            <Helmet>
                <title>Kidify - Log In </title>
                <meta
                    name="description"
                    content="Log in to KIDIFY!. Please Log In to view Kidify Contents!."
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Log in to KIDIFY!. Please Log In to view Kidify Contents!."
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Log In, login, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify - Login"
                    data-react-helmet="true"
                />
            </Helmet>
            <div className="login_container">
                <h3 className='LoginKidify'>Log In to KIDIFY!</h3>
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
                            <h5 onClick={forgotPass}>Forgot Password ?</h5>
                            <h5>|</h5>
                            <Link to='/register'><h5>Don't have an account yet? Register now!</h5></Link>
                        </div>
                    </center>
                </form>
            </div>
            {/* <div className='HFCCInfo'>
                <p>Partnered with:</p>
                <p>Holy Family Christian Church</p>
                <img
                    className='HFCCLogo'
                    src={ChurchLogo}
                    alt='Church logo'
                />
            </div> */}
        </div>
    )
}

export default AdminLogin

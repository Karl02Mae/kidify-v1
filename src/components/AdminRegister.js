import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import './AdminRegister.css';
import { Helmet } from 'react-helmet';

function AdminRegister() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const history = useHistory("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user is logged out
                setUser(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, username]);

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                    photoURL:null,
                })

            }).catch((error) => alert(error.message));
        history.push("/");
    }

    return (
        <div className="register">
            <Helmet>
                <title>Kidify - Admin Register </title>
                <meta
                    name="description"
                    content="Register to KIDIFY!. Register to kidify and log in to view contents!."
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Register to KIDIFY!. Register to kidify and log in to view contents!."
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Register, register, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify - Register"
                    data-react-helmet="true"
                />
            </Helmet>
            <div className="register_container">
                <h1>Sign Up</h1>
                <p>It's quick and easy.</p>
                <div className="hr3" />
                <form>
                    <center>
                        <input
                            onChange={(e) => {
                                if (e.target.value === 'KidifyAdmin2021') {
                                    alert('You cannot use this username!');
                                } else {
                                    setUsername(e.target.value);
                                }
                            }}
                            className="register_username"
                            type="username"
                            value={username}
                            placeholder="Username"
                            required
                        />
                    </center>

                    <center>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            value={email}
                            placeholder="Email"
                            required
                        />
                    </center>

                    <center>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            value={password}
                            placeholder="New Password"
                            required
                        />
                    </center>

                    <center>
                        <button onClick={register} type="submit" className="register_register">
                            Sign Up
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default AdminRegister

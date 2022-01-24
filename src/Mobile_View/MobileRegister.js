import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import logo from '../imgs/logo.png';
import './MobileRegister.css';

function MobileRegister() {
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
                    photoURL: null,
                })

            }).catch((error) => alert(error.message));
        history.push("/");
    }

    return (
        <HelmetProvider>
            <div className='register__container'>
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
                <div className='texts'>
                    <img src={logo} alt='Logo' height='200px' />
                    < h2 className='RegisterText'>Register to Kidify!</h2>
                    <h3 className='RegisterText2'>It's Quick and Easy!</h3>
                </div>
                <div className='inputFields'>
                    <input type='text'
                        className='inputFields__username'
                        placeholder='Enter your Username:'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input type='email'
                        className='inputFields__password'
                        placeholder='Enter your Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='password'
                        className='inputFields__password'
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='register__button'>
                    <button className='button__register' onClick={register}>Register</button>
                </div>
            </div >
        </HelmetProvider>
    )
}

export default MobileRegister

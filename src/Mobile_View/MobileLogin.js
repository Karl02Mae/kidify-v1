import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Box,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import logo from '../imgs/logo.png';


const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: '100vh',
        justifyContent: 'center',
        backgroundImage: `url(${'https://i.ibb.co/88p5zYT/background.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    Texts: {
        textAlign: 'center',
        marginTop: 5,
    },
    loginText: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    textFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginEmail: {
        marginTop: 3,
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    loginPassword: {
        marginTop: 1,
        marginBottom: 2,
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    forgot: {
        paddingTop: 3,
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
    },
    forgot2: {
        fontSize: '12px',
        fontWeight: '300',
    }
}

function MobileLogin() {

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

    return (
        <HelmetProvider>
            <Box sx={style.root}>
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
                <Box sx={style.Texts}>
                    <img src={logo} alt='Logo' height='200px' />
                    <Typography sx={style.loginText}>Login to Kidify!</Typography>
                </Box>
                <Box sx={style.textFieldContainer}>
                    <TextField
                        id='email'
                        sx={style.loginEmail}
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)} />

                    <TextField
                        id='password'
                        type='password'
                        sx={style.loginPassword}
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <Button
                        variant='outlined'
                        sx={style.LoginButton}
                        onClick={login}
                    >Login</Button>
                </Box>
                <Box sx={style.forgot}>
                    <Typography sx={style.forgot2}>Forgot Password?</Typography>
                    <Typography sx={style.forgot2}>|</Typography>
                    <Link to='/register'><Typography sx={style.forgot2}>Don't have an account yet? Register now!</Typography></Link>
                </Box>
            </Box>
        </HelmetProvider>
    )
}

export default MobileLogin

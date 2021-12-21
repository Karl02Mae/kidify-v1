import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Helmet } from 'react-helmet';
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
    texts: {
        paddingTop: 7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    text1: {
        fontWeight: 'bold',

    },
    text2: {
        fontSize: '12px',
        color: 'green',
    },
    InputFields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userName: {
        paddingTop: 1,
    },
    Email: {
        paddingTop: 2,
    },
    Password: {
        paddingTop: 2,
    },
    button: {
        paddingTop: 2,
    }
}

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
        <Box sx={style.root}>
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
            <Box sx={style.texts}>
                <img src={logo} alt='Logo' height='200px' />
                <Typography sx={style.text1}>Register to Kidify!</Typography>
                <Typography sx={style.text2}>It's Quick and Easy!</Typography>
            </Box>
            <Box sx={style.InputFields}>
                <TextField
                    sx={style.userName}
                    placeholder='Enter your Username:'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    sx={style.Email}
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={style.Password}
                    placeholder='Enter your Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box sx={style.registerButton}>
                <Button sx={style.button} onClick={register}>Register</Button>
            </Box>
        </Box>
    )
}

export default MobileRegister

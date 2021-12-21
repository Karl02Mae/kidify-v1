import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase';
import { Helmet } from 'react-helmet';
import MobileNotifCard from './MobileNotifCard';
import {
    Box,
    Typography,
    Button,
    //TextField,
} from '@mui/material';

const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    dailyVerse: {
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '10px',
    },
}

function MobileHome() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('announce').orderBy('date', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <Box sx={style.root}>
            <Helmet>
                <title>Kidify</title>
                <link rel='canonical' href='https://kidifyv1.netlify.app/' />
                <meta
                    name="description"
                    content="Welcome to KIDIFY!. You are currently viewing the home page of Kidify! "
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Welcome to KIDIFY!. You are currently viewing the home page of Kidify! "
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Announcements, announcements, Home, home, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify"
                    data-react-helmet="true"
                />
            </Helmet>
            <Typography sx={style.dailyVerse}>Verse of the Day</Typography>
            <Box sx={style.Container}>
                {
                    posts.map(({ id, data }) => (
                        <MobileNotifCard
                            key={id}
                            id={id}
                            user={data.username}
                            imageUrl={data.imageUrl}
                            title={data.title}
                            date={data.date}
                            message={data.caption}
                        />
                    ))
                }

                <Button onClick={() => {
                    if (window.confirm('Log out?') === true) {
                        alert("logged out!");
                        auth.signOut();
                        history.push('/login');
                    } else {
                        alert('Cancelled!');
                    }
                }}>
                    Logout
                </Button>
            </Box>
        </Box >
    )
}

export default MobileHome

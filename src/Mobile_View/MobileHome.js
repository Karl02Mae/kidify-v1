import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
//import { Helmet } from 'react-helmet';
import {
    Box,
    Typography,
    Button,
    //TextField,
} from '@mui/material';

function MobileHome() {
    const history = useHistory();
    return (
        <Box>
            <Typography>HOME</Typography>
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
        </Box >
    )
}

export default MobileHome

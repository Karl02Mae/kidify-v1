import React from 'react';
//import { useHistory } from 'react-router-dom';
import {
    Box,
    //Typography,
    //Button,
    //TextField,
} from '@mui/material';
import KDFLogo from '../imgs/kidify.png';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
//import Tooltip from '@mui/material/Tooltip';
import AddAlertIcon from '@material-ui/icons/AddAlert';

const style = {
    root: {
        display: 'flex',
        flex: 1,
        width: '100vw',
        height: '8vh',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 10,
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    mid: {
        display: 'flex',
        color: 'white',
    },
    icons: {
        marginRight: 1,
    },
    logoContainer: {
        paddingLeft: 1,
        paddingTop: 1,
        paddingBottom: 1,
    },
    avatarContainer: {
        marginRight: 1,
        marginTop: 1,
        marginBottom: 1,
        border: 'solid 2px white',
        borderRadius: '25px'
    },
}

function MobileHeader() {
    //const history = useHistory();
    return (
        <Box sx={style.root}>
            <Box sx={style.logoContainer}>
                <img src={KDFLogo}
                    alt='LOGO'
                    height='30px'
                />
            </Box>
            <Box sx={style.right}>
                <Box sx={style.mid}>
                    <Box sx={style.icons} >
                        <VideoCallIcon />
                    </Box>
                    <Box sx={style.icons} >
                        <AddAlertIcon />
                    </Box>
                    <Box sx={style.icons} >
                        <SearchIcon />
                    </Box>
                </Box>
                <Box sx={style.avatarContainer}>
                    <Avatar
                        alt='profile picture'
                        src=''
                        onClick=''
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default MobileHeader

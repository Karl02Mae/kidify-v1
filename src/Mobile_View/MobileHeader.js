import React, { useState, useEffect } from 'react';
import './MobileHeader.css';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import {
    Box,
    //Typography,
    //Button,
    // TextField,
} from '@mui/material';
import KDFLogo from '../imgs/logo.png';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import MobileHeaderProfile from './MobileHeaderProfile';
// import VideoCallIcon from '@material-ui/icons/VideoCall';
//import Tooltip from '@mui/material/Tooltip';
// import AddAlertIcon from '@material-ui/icons/AddAlert';

const style = {
    root: {
        display: 'flex',
        position: '-webkit-sticky', // eslint-disable-next-line
        position: 'sticky',
        top: 0,
        zIndex: 5,
        flex: 1,
        width: '100vw',
        height: '50px',
        backgroundColor: 'black',
        boxShadow: 10,
    },
    inactiveSearch: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        width: '100vw',
        alignItems: 'center',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    mid: {
        display: 'flex',
        color: 'white',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
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
    ProfileModal: {

    }
}

function MobileHeader() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');

    const handleClick = () => {
        if (show === false) {
            setShow(true);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setUserImage(authUser.photoURL);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName, history]);


    return (
        <Box sx={style.root}>
            <Box sx={style.inactiveSearch}>
                <Box sx={style.logoContainer}>
                    <img src={KDFLogo}
                        alt='LOGO'
                        height='50px'
                        onClick={() => history.push('/')}
                    />
                </Box>
                <Box sx={style.right}>
                    <Box sx={style.mid}>
                        <Box sx={style.search} >
                            <input className='searchBox' type='text'
                                placeholder='Search'
                            />
                            <SearchIcon />
                        </Box>
                    </Box>
                    <Box sx={style.avatarContainer}>
                        <Avatar
                            alt='profile picture'
                            src={userImage}
                            onClick={handleClick}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={style.ProfileModal}>
                <MobileHeaderProfile onClose={() => setShow(false)} show={show} username={displayName} url={userImage} />
            </Box>
        </Box>
    )
}

export default MobileHeader;

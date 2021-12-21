import React from 'react';
import { useHistory } from 'react-router-dom';
import './MobileFooter.css';
import {
    Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

function MobileFooter() {
    const history = useHistory();

    return (
        <div className='footer'>
            <div className='footer__Home'>
                <Button sx={{color: 'white',}} onClick={() => history.push('/')}>
                    <HomeIcon sx={{color: 'white',}} alt='Home'/>
                    Home
                </Button>
            </div>
            <div className='footer__Videos'>
                <Button sx={{color: 'white',}} onClick={() => history.push('/videos')}>
                    <VideoLibraryIcon sx={{color: 'white',}} alt='Videos'/>
                    Videos
                </Button>
            </div>
        </div>
    )
}

export default MobileFooter

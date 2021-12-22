import React from 'react';
import { useHistory } from 'react-router-dom';
import './MobileFooter.css';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

function MobileFooter() {
    const history = useHistory();

    return (
        <div className='footer'>
            <div className='footer__Home'>
                <h3 className='footerHomeTextIcon' onClick={() => history.push('/')}>
                    <HomeIcon sx={{ color: 'white', }} alt='Home' />
                    Home
                </h3>
            </div>
            <div className='footer__Videos'>
                <h3 className='footerVideosTextIcon' sx={{ color: 'white', }} onClick={() => history.push('/videos')}>
                    <VideoLibraryIcon sx={{ color: 'white', }} alt='Videos' />
                    Videos
                </h3>
            </div>
        </div>
    )
}

export default MobileFooter

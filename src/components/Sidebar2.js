import React from 'react'
import './Sidebar.css';

import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import InfoIcon from '@mui/icons-material/Info';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import ChurchLogo from '../imgs/Church_Logo.png';

import SidebarRow from './SidebarRow';

function Sidebar() {
    return (
        <div className="sidebar">

            <Link to='/'> <SidebarRow Icon={HomeIcon} title="Home" /> </Link>
            <Link to='/videos'> <SidebarRow selected Icon={VideoIcon} title="Videos" /> </Link>
            <Link to='/activities'><SidebarRow Icon={NoteAddIcon} title='Activities' /> </Link>
            <Link to='/about'><SidebarRow Icon={InfoIcon} title='About Us' /></Link>
            <hr />
            {/* <div className='HFCC'>
                <img className='HFCCLogo' src={ChurchLogo} alt='Church Logo' />
                <p className='HFCCText'>Kidify is an online streaming platform made for Holy Family Christian Church</p>
            </div> */}
        </div>
    )
}

export default Sidebar;

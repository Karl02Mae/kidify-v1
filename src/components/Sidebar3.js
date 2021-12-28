import React from 'react'
import './Sidebar.css';

import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import InfoIcon from '@mui/icons-material/Info';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


import SidebarRow from './SidebarRow';

function Sidebar() {
    return (
        <div className="sidebar">

            <Link to='/'> <SidebarRow Icon={HomeIcon} title="Home" /> </Link>
            <Link to='/videos'> <SidebarRow Icon={VideoIcon} title="Videos" /> </Link>
            <Link to='/activities'><SidebarRow selected Icon={NoteAddIcon} title='Activities' /> </Link>
            <Link to='/about'><SidebarRow Icon={InfoIcon} title='About Us' /></Link>
            <hr />
        </div>
    )
}

export default Sidebar;

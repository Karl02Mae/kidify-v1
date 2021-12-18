import React from 'react';
import './Sidebar.css';

import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import CommentIcon from '@material-ui/icons/Comment';

import SidebarRow from './SidebarRow';

function Sidebar() {
    return (
        <div className="sidebar">

            <Link to='/'> <SidebarRow selected Icon={HomeIcon} title="Home" /> </Link>
            <Link to='/videos'> <SidebarRow Icon={VideoIcon} title="Videos" /> </Link>
            <SidebarRow Icon={CommentIcon} title="Disqus" />
            <hr />
        </div>
    )
}

export default Sidebar;

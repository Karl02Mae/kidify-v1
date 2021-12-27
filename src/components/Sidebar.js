import React from 'react';
import './Sidebar.css';

import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import Church from '../imgs/Church_Logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';

import SidebarRow from './SidebarRow';

function Sidebar() {
    return (
        <div className="sidebar">

            <Link to='/'> <SidebarRow selected Icon={HomeIcon} title="Home" /> </Link>
            <Link to='/videos'> <SidebarRow Icon={VideoIcon} title="Videos" /> </Link>
            <hr />
            <div className='Church'>
                <div className='Church__Name__Cont'>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <img className='Church__Logo' src={Church} alt='Church Logo' height='50px' width='50px' />
                    </a>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <h3 className='Church__Name'>Holy Family Christian Church</h3>
                    </a>
                </div>
                <div className='Church__Location__Cont'>
                    <LocationOnIcon className='Church__Location__Logo' alt='location' />
                    <h3 className='Church__Location'>175, San Roque, San Luis, Pampanga</h3>
                </div>
                <div className='Church__Email__Cont'>
                    <EmailIcon className='Church__Email__Logo' alt='email' />
                    <h3 className='Church__Email'>ernand163@gmail.com</h3>
                </div>
                <div className='Church__Description__Cont'>
                    <InfoIcon className='Church__Description__Logo' alt='Logo' />
                    <h3 className='Church__Description'>"HFCC is a church that Loves God, make Disciples, and wants to change this nation."</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;

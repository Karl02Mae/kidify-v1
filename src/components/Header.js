import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import KDFLogo from '../imgs/kidify.png';
import './Header.css';
import ProfileModal from './ProfileModal';
// import { onAuthStateChanged } from 'firebase/auth';

import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@mui/material/Tooltip';

import AddAlertIcon from '@material-ui/icons/AddAlert';

import { auth } from '../firebase';


function Header() {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [show, setShow] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    const history = useHistory();

    const handleClick = () => {
        console.log(user);
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

    const handleSearch = () => {
        if (inputSearch === "") {
            alert('Please enter search key!')
        } else {
            history.push(`/search/${inputSearch}`);
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
                setUserImage(null);
                setDisplayName('');
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, userImage, displayName, history]);

    if (window.location.pathname === '/login' || window.location.pathname === '/registerKidifyAdmin') {
        return null;
    }
    else
        return (
            <div className="header">
                {/* Burger Menu and Logo */}
                <div className="header__left">
                    <Tooltip title='Home'>
                        <Link to='/'>
                            <img
                                src={KDFLogo}
                                alt="Kidify Logo"
                                className="header__logo"
                            />
                        </Link>
                    </Tooltip>
                </div>

                {/* Textbox and Search Icon */}
                <div className="header__input">
                    <Tooltip title='❗ Only use Search Key found at the bottom of each videos ❗'><input
                        onChange={e => setInputSearch(e.target.value)}
                        value={inputSearch}
                        placeholder=" Search"
                        type="text"
                    /></Tooltip>

                    <SearchIcon onClick={() => { setInputSearch(''); handleSearch(); }} className="header__inputButton" />

                </div>

                {/* Upload, Alert and Profile */}
                {displayName === 'KidifyAdmin2021' || displayName === 'ImaculadaConception' ? (
                    <div className="header__icons">
                        <Tooltip title='Upload Verse of the day'><Link to="/newannounce"><AddAlertIcon className="upload__icon" /></Link></Tooltip>
                        <Tooltip title='Upload Video'><Link to="/uploadvideos"><VideoCallIcon className="header__icon" /> </Link></Tooltip>
                        <Tooltip title='Profile'><Avatar className="header__avatar"
                            alt="Profile Picture"
                            src={userImage}
                            onClick={handleClick}
                        /></Tooltip>
                    </div>
                ) : (

                    <div className="home__userContainer">
                        <Avatar className="header__avatar"
                            alt="Profile Picture"
                            src={userImage}
                            onClick={handleClick}
                        />
                    </div>
                )}
                <div className='modal'>
                    <ProfileModal onClose={() => setShow(false)} show={show} username={displayName} url={userImage} />
                </div>
            </div>
        )
}

export default Header

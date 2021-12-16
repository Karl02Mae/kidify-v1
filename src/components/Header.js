import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import KDFLogo from '../imgs/kidify.png';
import './Header.css';
// import { onAuthStateChanged } from 'firebase/auth';

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@material-ui/core';

import AddAlertIcon from '@material-ui/icons/AddAlert';

import { auth } from '../firebase';


function Header() {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');

    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                auth.onAuthStateChanged((currentUser) => {
                    if (currentUser) {
                        setDisplayName(currentUser.displayName);
                        console.log(displayName);
                    } else {
                        setDisplayName('');
                    }
                })
            } else {
                //user is logged out
                setUser(null);
                history.push('login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    const [inputSearch, setInputSearch] = useState('');
    if (window.location.pathname === '/login' || window.location.pathname === '/registerKidifyAdmin') {
        return null;
    }
    else
        return (
            <div className="header">
                {/* Burger Menu and Logo */}
                <div className="header__left">
                    <MenuIcon />
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
                    <input
                        onChange={e => setInputSearch(e.target.value)}
                        value={inputSearch}
                        placeholder=" Search"
                        type="text"
                    />
                    <Link to={`/search/${inputSearch}`}>
                        <SearchIcon className="header__inputButton" />
                    </Link>
                </div>

                {/* Upload, Alert and Profile */}
                {displayName === 'KidifyAdmin2021' ? (
                    <div className="header__icons">
                        <Tooltip title='Upload Verse of the day'><Link to="/newannounce"><AddAlertIcon className="upload__icon" /></Link></Tooltip>
                        <Tooltip title='Upload Video'><Link to="/uploadvideos"><VideoCallIcon className="header__icon" /> </Link></Tooltip>
                        <Avatar className="header__icon"
                            alt="Profile Picture"
                            src=""
                        />
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
                    </div>
                ) : (
                    <div className="home__loginContainer">
                        <Button onClick={() => {
                            auth.signOut();
                            history.push('/login');
                        }}>
                            Logout
                        </Button>
                    </div>
                )}


            </div>
        )
}

export default Header

import React, { useState, useEffect } from 'react';
import './MobileHeaderProfile.css';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Avatar, Button } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

function MobileHeaderProfile(props) {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                setDisplayName(null);
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName, history]);


    const handleClick = () => {
        if (window.confirm('Are you sure you want to edit your profile?\nYou must fill all details again to update') === true) {
            history.push('/profile')
        } else {
            alert('Cancelled!')
        }
    }

    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='mobileProfile__container'>
                <Button
                    size='small'
                    className='mobileProfile__X'
                    onClick={props.onClose}>
                    <ArrowBackIcon />
                </Button>
                <div className='mobileProfile__Avatar'>
                    <Avatar
                        className='MobileAvatar__Profile'
                        src={props.url}
                        alt='Profile'
                    />
                    <h3>{props.username}</h3>
                    <h6>Username</h6>
                    <hr />
                </div>
                <div className='mobileProfile__Settings'>
                    <h4
                        className='mobileProfileSettingsText'
                        onClick={() => {
                            handleClick();
                        }}>Profile Settings
                    </h4>
                    <h4 className='mobileProfile__SettingsAbout'
                        onClick={() => { history.push('/aboutus'); props.onClose(); }}>
                        About Us
                    </h4>
                    <h4 className='mobileProfile__SettingsActivities'
                        onClick={() => { history.push('/activities'); props.onClose(); }}>
                        Activities
                    </h4>
                </div>
                {displayName === 'KidifyAdmin2021' ? (
                    <div className='adminFunctions'>
                        <h4 className='adminFncUploadVerse'
                            onClick={() => history.push('/uploadverse')}
                        >Upload Daily Verse</h4>
                        <h4 className='adminFncUploadVideos'
                            onClick={() => history.push('/uploadvideos')}>
                            Upload Videos
                        </h4>
                        <h4 className='adminFncChildJournals'
                            onClick={() => history.push('/journalDisplay')}>
                            Children's Journals
                        </h4>
                    </div>
                ) : (
                    <div></div>
                )}

                <div className='Logout'>
                    <h4
                        className='LogoutButton'
                        onClick={() => {
                            if (window.confirm('Log out?') === true) {
                                alert("logged out!");
                                auth.signOut();
                                history.push('/login');
                            } else {
                                alert('Cancelled!');
                            }
                        }}>
                        <LogoutIcon />
                        Log Out
                    </h4>
                </div>
            </div>
        )
    }
}

export default MobileHeaderProfile

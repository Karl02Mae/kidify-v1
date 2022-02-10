import React, { useState, useEffect } from 'react';
import './ProfileModal.css';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function ProfileModal(props) {

    const history = useHistory();
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                setDisplayName('');
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
        return null
    } else if (props.show === true) {
        return (
            <div className='profile__container'>
                <button className='profile__close' onClick={props.onClose}><h1>X</h1></button>
                <div className='profile__avatar'>
                    <center>
                        <Avatar
                            className='profile__picture'
                            alt='profile picture'
                            src={props.url}
                        />
                    </center>
                    <h3>{props.username}</h3>
                </div>
                <hr />

                <div className='profile__settings'>
                    <h3 onClick={() => { props.onClose(); handleClick(); }}>Profile Settings</h3>
                </div>

                {displayName === 'KidifyAdmin2021' || displayName === 'ImaculadaConception' ? (
                    <div className='adminJournal'>
                        <h3 onClick={() => { history.push('/journalDisplay'); props.onClose(); }}>Children's Journals</h3>
                        <h3 onClick={() => { history.push('/scores'); props.onClose(); }}>Quiz Scores</h3>
                    </div>
                ) : (<div></div>)
                }

                <div className='profile__logout'>
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
            </div >
        )
    }
}

export default ProfileModal;

import React from 'react';
import './ProfileModal.css';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function ProfileModal(props) {

    const history = useHistory();

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
                <Button className='profile__close' onClick={props.onClose}><h1>X</h1></Button>
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
            </div>
        )
    }
}

export default ProfileModal;

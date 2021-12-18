import React from 'react';
import './ProfileModal.css';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { auth } from '../firebase';

function ProfileModal(props) {

    const history = useHistory();

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
                            src=''
                        />
                    </center>
                    <h3>{props.username}</h3>
                </div>
                <hr />
                <div className='profile__settings'>
                    <Link to='/profile' onClick={props.onClose}><h3>Profile Settings</h3></Link>
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

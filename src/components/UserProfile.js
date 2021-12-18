import { Button } from '@material-ui/core';
import React from 'react';
import './UserProfile.css';

function UserProfile() {
    return (
        <div>
            <h2>Upload Profile Image</h2>
            <input type='file' />
            <h2>Update Username</h2>
            <input type='text' placeholder='Username' />
            <Button>Update Profile</Button>
        </div>
    )
}

export default UserProfile

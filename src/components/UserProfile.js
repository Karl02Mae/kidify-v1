// import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { storage, auth } from '../firebase';
import './UserProfile.css';

function UserProfile() {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [newPass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
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
                setDisplayName('');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (displayName === 'KidifyAdmin2021') {
            alert('You are an ADMIN!\nYou cannot change your Username!')
        } else {
            if (image === null) {
                alert('No Image Selected!');
            } else {
                const imageName = displayName + image.name;
                const uploadTask = storage.ref('profileImages/' + imageName).put(image);

                if (newPass !== conPass) {
                    alert('Password not matched!');
                } else {

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            setProgress(progress);
                        },
                        (error) => {
                            console.log(error);
                            alert(error.message);
                        },
                        () => {
                            storage
                                .ref('profileImages')
                                .child(imageName)
                                .getDownloadURL()
                                .then(url => {
                                    const currentUser = auth.currentUser;
                                    currentUser.updateProfile({
                                        photoURL: url,
                                    });

                                    currentUser.updatePassword(newPass);

                                    alert('Update Success!');
                                    setNewPass('');
                                    setConPass('');
                                    window.location.reload();
                                }).catch((error) => {
                                    console.log(error);
                                });
                        }
                    );
                }
            }
        }
    };

    return (
        <div className='container'>
            <div className='contain'>
                <h2>Upload Profile Image</h2>
                <input className='upload__Image' type='file' accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                <progress className="update__Progress" value={progress} max="100" />
                <h2>Update Password</h2>
                <input type='password' className='update__Password' placeholder='Password' onChange={event => setNewPass(event.target.value)} value={newPass} />
                <h2>Confirm New Password</h2>
                <input className='update__confirmPass' type='password' placeholder='Confirm Password' onChange={event => setConPass(event.target.value)} value={conPass} />
                <br />
                <button className='Button' onClick={handleUpload}>Update Profile</button>
                <button className='Button' onClick={() => history.push('/')}>Cancel</button>
            </div>
        </div>
    )
}

export default UserProfile

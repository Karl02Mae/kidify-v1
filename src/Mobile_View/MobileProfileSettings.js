import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './MobileProfileSettings.css';
import { storage, auth } from '../firebase';

function MobileProfileSettings() {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [newUserN, setNewUserN] = useState('');
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

    const handleCancel = () => {
        if (window.confirm('Cancel Update?') === true) {
            history.push('/');
        }
    }

    const handleUpload = () => {
        if (displayName === 'KidifyAdmin2021') {
            alert('You are an ADMIN!\nYou cannot change your Username!')
            setNewUserN('');
        } else {
            if (image === null) {
                alert('No Image Selected!');
            } else {
                const imageName = displayName + image.name;
                const uploadTask = storage.ref('profileImages/' + imageName).put(image);

                if (newUserN === '') {
                    alert('No Username Entered!');
                } else if (newPass !== conPass) {
                    alert('Password not matched!')
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
                                        displayName: newUserN,
                                        photoURL: url,
                                    });

                                    currentUser.updatePassword(newPass);

                                    alert('Update Success!\nYou will now be logged out.');
                                    setNewUserN('');
                                    history.push('/');
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
        <div className='ProfileSettingsContainer'>
            <div className='ProfileContainer'>
                <h3 className='labels'>Upload New Profile Picture</h3>
                <progress className="mobileUpdate__Progress" value={progress} max="100" />
                <input className='mobileUpload__Image' type='file' accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                <h3 className='labels'>Update Username</h3>
                <input className='mobileUpdate__Username' type='text' placeholder='Username' onChange={event => setNewUserN(event.target.value)} value={newUserN} />
                <h3 className='labels'>Update Password</h3>
                <input className='mobileUpdate__Password' type='password' placeholder='Password' onChange={event => setNewPass(event.target.value)} value={newPass} />
                <h3 className='labels'>Confirm Password</h3>
                <input className='mobileUpdate__conPass' type='password' placeholder='Confirm Password' onChange={event => setConPass(event.target.value)} value={conPass} />
                <br />
                <div className='buttons'>
                    <h3 className='UpdateButton' onClick={handleUpload}>Update Profile</h3>
                    <h3 className='CancelUpdate' onClick={handleCancel}>Cancel</h3>
                </div>
            </div>
        </div>
    )
}

export default MobileProfileSettings

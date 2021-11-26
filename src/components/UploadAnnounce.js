import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import AnnounceImageUpload from './AnnounceImageUpload';
import './UploadAnnounce.css';

function UploadAnnounce() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user is logged out
                setUser(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user]);

    return (
        <div className="container">
            {user?.displayName ? (
                <AnnounceImageUpload username={user.displayName} />
            ) : (
                <h3>Login to Post to KIDIFY!</h3>
            )}
        </div>
    )
}

export default UploadAnnounce

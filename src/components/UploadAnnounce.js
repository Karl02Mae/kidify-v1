import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import AnnounceImageUpload from './AnnounceImageUpload';
import './UploadAnnounce.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
        <HelmetProvider>
            <div className="container">
                <Helmet>
                    <title>Kidify - Admin: Upload Announcement</title>
                    <meta
                        name="description"
                        content="Welcome to KIDIFY!. if you are not an admin of this page, please visit https://kidifyv1.netlify.app/ "
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:description"
                        content="Welcome to KIDIFY!. if you are not an admin of this page, please visit https://kidifyv1.netlify.app/"
                        data-react-helmet="true"
                    />
                    <meta
                        name="keywords"
                        content="Kidify, Church Lessons, Upload, upload, church lessons, kidify"
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:title"
                        content="Kidify - Upload Announcement"
                        data-react-helmet="true"
                    />
                </Helmet>
                <h1 className="title">Upload Verse of the Day</h1>
                {user?.displayName ? (
                    <AnnounceImageUpload username={user.displayName} />
                ) : (
                    <h3>Login to Post to KIDIFY!</h3>
                )}
            </div>
        </HelmetProvider>)
}

export default UploadAnnounce

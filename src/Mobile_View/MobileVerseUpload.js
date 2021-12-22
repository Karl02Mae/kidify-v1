import React, { useState, useEffect } from 'react';
import './MobileVerseUpload.css';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { storage, db } from '../firebase';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MobileVerseUpload() {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [date, setDate] = useState('');

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
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName, history]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (image === null) {
            alert("No Image Selected!");
        } else {
            const imageName = title + image.name;
            const uploadTask = storage.ref('images/' + imageName).put(image);

            if (title === '' || caption === '' || date === '') {
                alert('Please Complete the Announcement Details!');
            } else {

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        //progress function...
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        //Error Function...
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        //complete function..
                        storage
                            .ref("images")
                            .child(imageName)
                            .getDownloadURL()
                            .then(url => {
                                //post image inside db...
                                db.collection("announce").add({
                                    title: title,
                                    caption: caption,
                                    imageUrl: url,
                                    date: date,
                                    username: displayName
                                });

                                alert('Upload Success!');
                                setProgress(0);
                                setCaption("");
                                setTitle("");
                                setImage(null);
                                setDate('');
                                history.push('/')
                            }).catch((error) => {
                                console.log(error);
                            });
                    }
                );
            }
        }
    };

    return (
        <HelmetProvider>
            <div className='VerseUploadContainer'>
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
                <h3 className='backButton'
                    onClick={() => history.push('/')}
                >
                    <ArrowBackIcon />
                </h3>
                <div className='mobileContainer'>
                    <div className='mobileImageContainer'>
                        <progress className="mobileImageUpload__progress" value={progress} max="100" />
                        <p className="mobileUpload">Upload Daily Verse Image</p>
                        <input className="mobileImageUpload__button" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleChange} />
                    </div>
                    <input className="mobileImageUpload__title" type="text" placeholder="Enter Announcement Title" onChange={event => setTitle(event.target.value)} value={title} required />
                    <textarea className="mobileImageUpload__text" type="text" placeholder="Enter a message..." onChange={event => setCaption(event.target.value)} value={caption} required />
                    <input className="mobileImageUpload__date" type="date" onChange={event => setDate(event.target.value)} value={date} />
                    <h3 className="mobileButton__upload" onClick={handleUpload}>
                        Upload
                    </h3>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default MobileVerseUpload

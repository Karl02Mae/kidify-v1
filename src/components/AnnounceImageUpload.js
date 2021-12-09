import React, { useState } from 'react';
//import firebase from '@firebase/app-compat';
import { storage, db } from '../firebase';
import { Button } from '@material-ui/core';
import './AnnounceImageUpload.css';
import { useHistory } from 'react-router-dom';

function AnnounceImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

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
                                    username: username
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
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <p className="upload">Upload Announcement Image</p>
            <input className="imageupload__button" type="file" onChange={handleChange} />
            <input className="imageupload__title" type="text" placeholder="Enter Announcement Title" onChange={event => setTitle(event.target.value)} value={title} required />
            <textarea className="imageupload__text" type="text" placeholder="Enter a message..." onChange={event => setCaption(event.target.value)} value={caption} required />
            <input className="imageupload__date" type="date" onChange={event => setDate(event.target.value)} value={date} />
            <Button className="button__upload" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default AnnounceImageUpload

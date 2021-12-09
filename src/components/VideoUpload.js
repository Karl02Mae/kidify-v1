import React, { useState } from 'react';
import { storage, db } from '../firebase';
import './VideoUpload.css';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

function VideoUpload() {

    const [video, setVideo] = useState(null);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoCaption, setVideoCaption] = useState("");
    const [videoDate, setVideoDate] = useState('');

    const history = useHistory("");

    const videoHandleChange = (e) => {
        if (e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (video === null) {
            alert("No Video Selected!");
        } else {
            const uploadTaskVideo = storage.ref('videos/' + video.name).put(video);

            if (videoTitle === '' || videoCaption === '' || videoDate === '') {
                alert('Please Enter Video Details!');
            } else {

                uploadTaskVideo.on(
                    "state_changed",
                    (snapshot) => {
                        //progress function...
                        const videoProgress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setVideoProgress(videoProgress);
                    },
                    (error) => {
                        //Error Function...
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        //complete function..

                        storage.ref("videos")
                            .child(video.name)
                            .getDownloadURL()
                            .then(function (vidUrl) {
                                var xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                xhr.onload = function (event) {
                                    var blob = xhr.response;
                                    console.log(blob);
                                };
                                xhr.open('GET', vidUrl);
                                xhr.send();
                                console.log(vidUrl);


                                db.collection("videos").add({
                                    videoCaption: videoCaption,
                                    videoDate: videoDate,
                                    videoTitle: videoTitle,
                                    videoUrl: vidUrl
                                });

                                alert('Upload Success!');

                                setVideoCaption("");
                                setVideoTitle("");
                                setVideoDate('');
                                setVideoProgress(0);
                                history.push('/videos');
                            }).catch((error) => {
                                console.log(error);
                            });
                    }
                );
            }
        }
    };

    return (
        <div className="videoUpload__container">
            <progress className="videoUpload__video__progress" value={videoProgress} max="100" />
            <p className="videoUpload__fileLabel">Upload Video</p>
            <input className="videoUpload__video" type="file" accept="video/mp4" onChange={videoHandleChange} />
            <input className="videoUpload__title" type="text" placeholder="Enter Video Title" onChange={event => setVideoTitle(event.target.value)} value={videoTitle} required />
            <textarea className="videoUpload__caption" type="text" placeholder="Enter Video Caption" onChange={event => setVideoCaption(event.target.value)} value={videoCaption} required />
            <input className="videoUpload__date" type="date" onChange={event => setVideoDate(event.target.value)} value={videoDate} />
            <Button className="button__videoUpload" onClick={handleUpload} >
                Upload Video
            </Button>
        </div>
    )
}

export default VideoUpload

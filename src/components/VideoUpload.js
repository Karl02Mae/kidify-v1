import React, { useState } from 'react';
import { storage, db } from '../firebase';
import './VideoUpload.css';
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { Button } from '@material-ui/core';

function VideoUpload() {

    const [video, setVideo] = useState(null);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoCaption, setVideoCaption] = useState("");
    const [videoDate, setVideoDate] = useState('');
    // const [videoThumbnail, setVideoThumbnail] = useState(null);
    // const [thumbnailProgress, setThumbnailProgress] = useState(0);

    const videoHandleChange = (e) => {
        if (e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    }

    // const thumbnailHandleChange = (e) => {
    //     if (e.target.files[0]) {
    //         setVideoThumbnail(e.target.files[0]);
    //     }
    // }

    const handleUpload = () => {
        if (video === null) {
            alert("No Video Selected!");
        } else {
            const uploadTaskVideo = storage.ref('videos/' + video.name).put(video);
            // const uploadTaskThumb = storage.ref('videos/' + videoThumbnail.name).put(videoThumbnail);

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
                            };
                            xhr.open('GET', vidUrl);
                            xhr.send();
                            setVideo(vidUrl);
                            console.log(vidUrl);

                            db.collection("videos").add({
                                videoCaption: videoCaption,
                                videoDate: videoDate,
                                videoTitle: videoTitle,
                                videoUrl: vidUrl
                            });

                            setVideoCaption("");
                            setVideoTitle("");
                            setVideoDate('');
                            setVideoProgress(0);
                        }).catch((error) => {
                            console.log(error);
                        });

                    //     storage
                    //         .ref("videos")
                    //         .child(video.name)
                    //         .getDownloadURL()
                    //         .then(vidUrl => {
                    //             //post image inside db...
                    //             db.collection("videos").add({
                    //                 videoUrl: vidUrl
                    //             });

                    //             setVideoProgress(0);
                    //             setVideo(null);
                    //         });

                    // storage
                    //     .ref("thumbnail")
                    //     .child(videoThumbnail.name)
                    //     .getDownloadURL()
                    //     .then(thumbUrl => {
                    //         //post image inside db...



                    //     });
                }
            );

            // uploadTaskThumb.on(
            //     "state_changed",
            //     (snapshot) => {
            //         //progress function...
            //         const thumbProgress = Math.round(
            //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //         );
            //         setThumbnailProgress(thumbProgress);
            //     },
            //     (error) => {
            //         //Error Function...
            //         console.log(error);
            //         alert(error.message);
            //     },
            //     () => {
            //         //complete function..

            //     }
            // );
        }
    };

    return (
        <div className="videoUpload__container">
            <progress className="videoUpload__video__progress" value={videoProgress} max="100" />
            <p className="videoUpload__fileLabel">Upload Video</p>
            <input className="videoUpload__video" type="file" accept="video/mp4" onChange={videoHandleChange} />
            <input className="videoUpload__title" type="text" placeholder="Enter Video Title" onChange={event => setVideoTitle(event.target.value)} value={videoTitle} />
            <input className="videoUpload__caption" type="text" placeholder="Enter Video Caption" onChange={event => setVideoCaption(event.target.value)} value={videoCaption} />
            <input className="videoUpload__date" type="date" onChange={event => setVideoDate(event.target.value)} value={videoDate} />
            {/* <progress className="videoUpload__thumbnail__progress" value={thumbnailProgress} max="100" /> */}
            <p className="videoUpload__fileLabel">Upload Thumbnail</p>
            {/* <input className="videoUpload__thumbnail" type="file" accept="image/png, image/jpeg" onChange={thumbnailHandleChange} /> */}
            <Button className="button__videoUpload" onClick={handleUpload} >
                Upload Video
            </Button>
        </div>
    )
}

export default VideoUpload

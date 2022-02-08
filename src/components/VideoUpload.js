import React, { useState } from 'react';
import { storage, db } from '../firebase';
import './VideoUpload.css';
import { useHistory } from 'react-router-dom';

function VideoUpload() {

    const [video, setVideo] = useState(null);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoCaption, setVideoCaption] = useState("");
    const [searchKey, setSearchKey] = useState('');
    const [videoCategory, setVideoCategory] = useState('');
    const [videoRange, setVideoRange] = useState('');
    const current = new Date();
    const videoDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

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

            if (videoTitle === '' || videoCaption === '' || videoDate === '' || searchKey === '' || videoCategory === '' || videoRange === '') {
                alert('Please complete all Video Details!');
            } else if (searchKey.includes(' ')) {
                alert('Search Key must not have spaces!')
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
                                    searchKey: searchKey,
                                    videoCaption: videoCaption,
                                    videoDate: videoDate,
                                    videoTitle: videoTitle,
                                    videoUrl: vidUrl,
                                    videoCategory: videoCategory,
                                    range: videoRange,
                                });

                                alert('Upload Success!');
                                setSearchKey('');
                                setVideoCaption("");
                                setVideoTitle("");
                                setVideoProgress(0);
                                setVideoCategory('');
                                setVideoRange('');
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
            <input className='videoUpload__searchKey' type="text" placeholder='Enter Search Key' onChange={event => setSearchKey(event.target.value)} value={searchKey} required />
            <div className='videoUpload__catage__cont'>
                <select name='videoUpload__Category' className='videoUpload__Category' onChange={(e) => setVideoCategory(e.target.value)} value={videoCategory} required>
                    <option value=''>Category</option>
                    <option value='Lessons'>Lessons</option>
                    <option value='Mass'>Mass</option>
                </select>
                <select name='videoUpload__Range' className='videoUpload__Range' onChange={(e) => setVideoRange(e.target.value)} value={videoRange} required>
                    <option value=''>Age Range</option>
                    <option value='8-10'>8 to 10</option>
                    <option value='11-14'>11 to 14</option>
                    <option value='15-16'>15 to 16</option>
                </select>
            </div>
            <button className="button__videoUpload" onClick={handleUpload} >
                Upload Video
            </button>
        </div>
    )
}

export default VideoUpload

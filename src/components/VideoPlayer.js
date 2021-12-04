import React, { useState } from 'react'
import './VideoPlayer.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

function VideoPlayer({ videoTitle, videoUrl }) {

    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState('');
    db.collection('videos').doc(id).get().then(snapshot => setVideoDetails(snapshot.data()));

    return (
        <div className="videoPlayer__container">
            <h1>Helloo</h1>
            {/* {console.log(id)} */}
            <ReactPlayer
                id="videoPlayer"
                url={videoDetails.videoUrl}
                height="100%"
                width='100%'
                playing={true}
                controls={true}
                volume={1}
                progressInterval={5000}
                pip={true}
            />
        </div>
    )
}

export default VideoPlayer

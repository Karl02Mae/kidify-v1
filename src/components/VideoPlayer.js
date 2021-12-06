import React, { useState } from 'react'
import './VideoPlayer.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { Helmet } from 'react-helmet';

function VideoPlayer() {
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState('');
    db.collection('videos').doc(id).get().then(snapshot => setVideoDetails(snapshot.data()));
    // const { title } = useState(videoDetails.videoTitle)

    return (
        <div className="videoPlayer__container">
            <Helmet>
                <title>Kidify - Play</title>
                <meta
                    name="description"
                    content="Welcome to KIDIFY!. "
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Welcome to KIDIFY!. "
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Videos, videos, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify - Play"
                    data-react-helmet="true"
                />
            </Helmet>
            <h1>Helloo</h1>
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

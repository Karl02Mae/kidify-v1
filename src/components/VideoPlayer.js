import React, { useState } from 'react'
import './VideoPlayer.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    FacebookShareButton, FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LineShareButton, LineIcon
} from 'react-share';

function VideoPlayer() {
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState('');
    db.collection('videos').doc(id).get().then(snapshot => setVideoDetails(snapshot.data()));
    const currentUrl = window.location.href;

    return (
        <HelmetProvider>
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
                <div className="videoPlayerBox">
                    <ReactPlayer
                        id="videoPlayer"
                        url={videoDetails.videoUrl}
                        height="100%"
                        width='100%'
                        playing={true}
                        controls={true}
                        volume={1}
                        progressInterval={1000}
                        pip={true}
                    />
                </div>
                <div className='videoDetails'>
                    <div>
                        <h2 className='Title'>{videoDetails.videoTitle}</h2>
                        <p className='Date'>{videoDetails.videoDate}</p>
                    </div>
                    <div className='Share'>
                        <FacebookShareButton url={currentUrl}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton url={currentUrl}>
                            <FacebookMessengerIcon size={40} round={true} />
                        </FacebookMessengerShareButton>
                        <TwitterShareButton url={currentUrl}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                        <LineShareButton url={currentUrl}>
                            <LineIcon size={40} round={true} />
                        </LineShareButton>
                        <WhatsappShareButton url={currentUrl}>
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                    </div>
                </div>
                <hr />
                <div className='Caption'>
                    <p>{videoDetails.videoCaption}</p>
                </div>
                <hr />
                <div className='Comments'>
                    {/* DISQUS PLUGIN WILL BE INSTALLED HERE */}
                </div>
            </div>
        </HelmetProvider>)
}

export default VideoPlayer

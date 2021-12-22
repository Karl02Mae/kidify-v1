import React, { useState, useEffect } from 'react';
import './MobileVideoPlayer.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import MobileComments from './MobileComments';
import {
    FacebookShareButton, FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LineShareButton, LineIcon
} from 'react-share';

function MobileVideoPlayer() {
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState('');
    const currentUrl = window.location.href;
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                db.collection('videos').doc(id).get().then(snapshot => setVideoDetails(snapshot.data()));
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
    }, [user, displayName, history, id]);

    return (
        <HelmetProvider>
            <div className='mobileVideoPlayer__Container'>
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
                <div className='mobileVideoPlayerBox'>
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
                <div className='mobileVideoDetails'>
                    <div className='mobileVideoText'>
                        <h2 className='mobileTitle'>{videoDetails.videoTitle}</h2>
                        <p className='mobileDate'>{videoDetails.videoDate}</p>
                    </div>
                    <div className='mobileCaption'>
                        <p className='captionText'>{videoDetails.videoCaption}</p>
                    </div>
                    <div className='mobileShare'>
                        <h3 className='mobileShareLabel'>Share</h3>
                        <div className='shareIcons'>
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
                </div>
                <div className='mobileComments'>
                    <div className='mobileCommentTitle'>
                        <h3>Comments</h3>
                    </div>
                    <div className='mobileComment__container'>
                        <MobileComments id={id} />
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default MobileVideoPlayer

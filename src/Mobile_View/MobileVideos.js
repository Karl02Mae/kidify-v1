import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import './MobileVideos.css';
import MobileVideoCard from './MobileVideoCard';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function MobileVideos() {

    const [vids, setVids] = useState([]);

    useEffect(() => {
        db.collection('videos').orderBy('videoDate', 'desc').onSnapshot(snapshot => {
            setVids(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <HelmetProvider>
            <div className='mobileVideos'>
                <Helmet>
                    <title>Kidify - Videos </title>
                    <link rel='canonical' href='https://kidifyv1.netlify.app/' />
                    <meta
                        name="description"
                        content="Welcome to KIDIFY!. Watch Video Lessons of Holy Family Christian Church for the Children's Ministry."
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:description"
                        content="Welcome to KIDIFY!. Watch Video Lessons of Holy Family Christian Church for the Children's Ministry."
                        data-react-helmet="true"
                    />
                    <meta
                        name="keywords"
                        content="Kidify, Church Lessons, Videos, videos, church lessons, kidify"
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:title"
                        content="Kidify - Videos"
                        data-react-helmet="true"
                    />
                </Helmet>
                <h2 className='mobileVideosTitle'> Available Lessons </h2>
                <div className="Videos__uploads">
                    {
                        vids.map(({ id, data }) => (
                            <MobileVideoCard
                                key={id}
                                id={id}
                                searchKey={data.searchKey}
                                videoTitle={data.videoTitle}
                                videoDate={data.videoDate}
                                videoCaption={data.videoCaption}
                                videoUrl={data.videoUrl}
                            />
                        ))
                    }

                </div>
            </div>
        </HelmetProvider>
    )
}

export default MobileVideos;

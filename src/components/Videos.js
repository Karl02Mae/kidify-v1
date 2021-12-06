import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import './Videos.css';
import { Helmet } from 'react-helmet';
//import KDFLogo from '../imgs/kidify.png';
//import DummyThumbnail from '../imgs/1111.jpg';

function Videos() {

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
        <div className="Videos">
            <Helmet>
                <title>Kidify - Videos </title>
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
            <h2> Available Lessons </h2>
            <div className="Videos__uploads">

                {
                    vids.map(({ id, data }) => (
                        <Link
                            key={id}
                            to={{ pathname: `/play/${id}/${data.videoUrl}`, data: data }}>
                            {console.log(id)}
                            <VideoCard
                                key={id}
                                videoTitle={data.videoTitle}
                                videoDate={data.videoDate}
                                videoCaption={data.videoCaption}
                                videoUrl={data.videoUrl}
                            />
                            {console.log(data.videoUrl)}
                        </Link>
                    ))

                }

            </div>
        </div>
    )
}

export default Videos;

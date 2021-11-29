import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import './Videos.css';
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
            <h2> Available Lessons </h2>
            <div className="Videos__uploads">

                {
                    vids.map(({ id, data }) => (
                        <Link to={{ pathname: `/play/${id}`, data: data}}>
                            {console.log(id)}
                            <VideoCard
                                key={id}
                                videoTitle={data.videoTitle}
                                videoDate={data.videoDate}
                                videoCaption={data.videoCaption}
                                videoUrl={data.videoUrl}
                            />
                        </Link>
                    ))

                }

            </div>
        </div>
    )
}

export default Videos;

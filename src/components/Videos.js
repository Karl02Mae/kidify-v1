import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import VideoCard from './VideoCard';
//import { Link } from 'react-router-dom';
import './Videos.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Videos() {

    const [vids, setVids] = useState([]);
    const [cat, setCat] = useState('default');
    const [range, setRange] = useState('default');


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
            <div className="Videos">
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
                <h2> Available Lessons </h2>
                <label for='category'>Category:</label>
                <select name='category' className='category' onChange={(e) => setCat(e.target.value)}>
                    <option value='default'>Default</option>
                    <option value='Lessons'>Lessons</option>
                    <option value='Mass'>Mass</option>
                </select>
                <label for='range'>Age Range:</label>
                <select name='range' className='range' onChange={(e) => setRange(e.target.value)}>
                    <option value='default'>Default</option>
                    <option value='8-10'>8 - 10</option>
                    <option value='11-14'>11-14</option>
                    <option value='15-16'>15-16</option>
                </select>
                <div className="Videos__uploads">
                    {
                        vids.map(({ id, data }) => {
                            if (cat === 'default' && range === 'default') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'default' && range === '8-10' && data.range === '8-10') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'default' && range === '11-14' && data.range === '11-14') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'default' && range === '15-16' && data.range === '15-16') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Lessons' && data.videoCategory === 'Lessons' && range === 'default') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Lessons' && data.videoCategory === 'Lessons' && range === '8-10' && data.range === '8-10') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Lessons' && data.videoCategory === 'Lessons' && range === '11-14' && data.range === '11-14') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Lessons' && data.videoCategory === 'Lessons' && range === '15-16' && data.range === '15-16') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Mass' && data.videoCategory === 'Mass' && range === 'default') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Mass' && data.videoCategory === 'Mass' && range === '8-10' && data.range === '8-10') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Mass' && data.videoCategory === 'Mass' && range === '11-14' && data.range === '11-14') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else if (cat === 'Mass' && data.videoCategory === 'Mass' && range === '15-16' && data.range === '15-16') {
                                return <VideoCard
                                    key={id}
                                    id={id}
                                    searchKey={data.searchKey}
                                    videoTitle={data.videoTitle}
                                    videoDate={data.videoDate}
                                    videoCaption={data.videoCaption}
                                    videoUrl={data.videoUrl}
                                />
                            } else {
                                return <div id={id}></div>
                            }
                        })
                    }

                </div>
            </div>
        </HelmetProvider>)
}

export default Videos;

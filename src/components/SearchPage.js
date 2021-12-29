import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import { db } from '../firebase';
import VideoRow from './VideoRow';
import DummyThumbnail from '../imgs/1111.jpg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function SearchPage() {

    const { searchTerm } = useParams();
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
            <div className="searchPage">
                <Helmet>
                    <title>Kidify - Search </title>
                    <meta
                        name="description"
                        content="Searching a Video from KIDIFY!."
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:description"
                        content="Searching a Video from KIDIFY!."
                        data-react-helmet="true"
                    />
                    <meta
                        name="keywords"
                        content="Kidify, Church Lessons, Search, search, church lessons, kidify"
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:title"
                        content="Kidify - Search"
                        data-react-helmet="true"
                    />
                </Helmet>
                {vids.map(({ id, data }) => {
                    if (data.searchKey === searchTerm) {
                        return <VideoRow
                            key={id}
                            id={id}
                            date={data.videoDate}
                            channel="Holy Family Christian Church"
                            title={data.videoTitle}
                            img={DummyThumbnail}
                            description={data.videoCaption}
                        />
                    }
                    return <div key={id}></div>
                })
                }



            </div>
        </HelmetProvider>
    )
}

export default SearchPage

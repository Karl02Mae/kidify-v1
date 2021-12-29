import React, { useState, useEffect } from 'react';
import './MobileSearchPage.css';
import { db } from '../firebase';
import MobileVideoRow from './MobileVideoRow';
import DummyThumbnail from '../imgs/1111.jpg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function MobileSearchPage() {

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
            <div className="SearchPageContainer">
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
                        return <MobileVideoRow
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

export default MobileSearchPage

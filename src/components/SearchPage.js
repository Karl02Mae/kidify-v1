import React from 'react'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import './SearchPage.css';
import VideoRow from './VideoRow';
import DummyThumbnail from '../imgs/1111.jpg';
import { Helmet } from 'react-helmet';

function SearchPage() {
    return (
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
            <div className="searchPage__filter">
                <TuneOutlinedIcon />
                <h2>FILTER</h2>
            </div>
            <hr />

            <VideoRow
                views="1.4M"
                description="LET's Learn from the Church!"
                timestamp="50 seconds ago"
                channel="KIRACHURCH"
                title="Let's Learn!"
                img={DummyThumbnail}
            />

            <VideoRow
                views="1.4M"
                description="LET's Learn from the Church!"
                timestamp="50 seconds ago"
                channel="KIRACHURCH"
                title="Let's Learn!"
                img={DummyThumbnail}
            />

            <VideoRow
                views="1.4M"
                description="LET's Learn from the Church!"
                timestamp="50 seconds ago"
                channel="KIRACHURCH"
                title="Let's Learn!"
                img={DummyThumbnail}
            />

        </div>
    )
}

export default SearchPage

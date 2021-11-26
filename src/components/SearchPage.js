import React from 'react'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import './SearchPage.css';
import VideoRow from './VideoRow';
import DummyThumbnail from '../imgs/1111.jpg';

function SearchPage() {
    return (
        <div className="searchPage">
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

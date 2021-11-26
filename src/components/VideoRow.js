import React from 'react';
import './VideoRow.css';

function VideoRow({ views, description, timestamp, channel, title, img }) {
    return (
        <div className="videoRow">
            <img src={img} alt="" />
            <div className="videoRow__text">
                <h3>{title}</h3>
                <p className="videoRow__headline">
                    {channel} | <span className="videoRow__views"><span className="videoRow__viewsNo">{views}</span> views</span> | {timestamp}
                </p>
                <p className="videoRow__description">{description}</p>
            </div>
        </div>
    )
}

export default VideoRow

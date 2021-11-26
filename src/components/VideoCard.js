import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import './VideoCard.css';

function VideoCard({ image, title, channel, views, timestamp, chan_img }) {
    return (
        <div className="videoCard">
            <img className="videoCard__thumbnail" src={image} alt="Thumbnail" height="200px"/>
            <div className="video__info">
                <Avatar className="video__avatar"
                    alt={channel}
                    src={chan_img} />
                <div className="video__text">
                    <h4>{title}</h4>
                    <p>{channel}</p>
                    <p>
                        {views} | {timestamp}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard

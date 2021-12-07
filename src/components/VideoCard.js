import React/*, { useState }*/ from 'react';
//import Avatar from "@material-ui/core/Avatar";
import './VideoCard.css';
import Dummy from '../imgs/1111.jpg';

function VideoCard({ videoTitle, videoCaption, videoDate, videoUrl }) {

    return (
        <div className="videoCard">
            <img className="videoCard__thumbnail"
                src={Dummy}
                alt="Thumbnail"
                height="200px"
            />
            <div className="video__info">
                {/* <Avatar className="video__avatar"
                    alt={channel}
                    src={chan_img} /> */}
                <div className="video__text">
                    <h4>{videoTitle}</h4>
                    <p>
                        {videoDate}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;

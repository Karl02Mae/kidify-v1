import React from 'react';
import './VideoRow.css';
import { Link } from 'react-router-dom';

function VideoRow({ description, date, channel, title, img, id }) {
    return (
        <div className="videoRow">
            <Link to={{ pathname: `/play/${id}/` }}>
                <img className='videoRow__thumbnail' src={img} alt={title} />
            </Link>
            <div className="videoRow__text">
                <Link to={{ pathname: `/play/${id}/` }}>
                    <h3 className='videoRow__title'>{title}</h3>
                </Link>
                <p className="videoRow__headline">
                    {channel} | {date}
                </p>
                <p className="videoRow__description">{description}</p>
            </div>
        </div>
    )
}

export default VideoRow

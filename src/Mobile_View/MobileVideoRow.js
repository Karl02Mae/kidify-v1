import React from 'react';
import './MobileVideoRow.css';
import { Link } from 'react-router-dom';

function MobileVideoRow({ description, date, channel, title, img, id }) {
    return (
        <div className="MobileVideoRow">
            <Link to={{ pathname: `/play/${id}/` }}>
                <img className='MobileVideoRow__thumbnail' src={img} alt={title} />
            </Link>
            <div className="MobileVideoRow__text">
                <Link to={{ pathname: `/play/${id}/` }}>
                    <h3 className='MobileVideoRow__title'>{title}</h3>
                </Link>
                <p className="MobileVideoRow__headline">
                    {channel} | {date}
                </p>
                <p className="MobileVideoRow__description">{description}</p>
            </div>
        </div>
    )
}

export default MobileVideoRow

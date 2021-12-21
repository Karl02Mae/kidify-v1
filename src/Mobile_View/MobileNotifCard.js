import React from 'react';
import './MobileNotifCard.css';

function MobileNotifCard({ user, imageUrl, title, date, message, id }) {
    return (
        <div className='MobileNotifCard'>
            <img className="MobileNotifCard__thumbnail" src={imageUrl} alt="thumbnail" />
            <div className="MobileNotif__info">
                <div className="MobileNotif__text">
                    <h4>{title}</h4>
                    <p className="MobileNotif__text__uid">{user}</p>
                    <p className="MobileNotif__text__time">{date}</p>
                    <p className="MobileNotif__text__message">{message}</p>

                </div>
            </div>
        </div>
    )
}

export default MobileNotifCard

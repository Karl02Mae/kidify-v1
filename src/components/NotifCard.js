import React from 'react';
import './NotifCard.css';

function NotifCard({ user, imageUrl, title, date, message}) {
    return (
        <div className="NotifCard">
            <img className="NotifCard__thumbnail" src={imageUrl} alt="thumbnail" height="200px" />
            <div className="Notif__info">
                <div className="Notif__text">
                    <h4>{title}</h4>
                    <p className="Notif__text__time">{date}</p>
                    <p className="Notif__text__message">{message}</p>
                    <p className="Notif__text__uid">{user}</p>
                </div>
            </div>
        </div>
    )
}

export default NotifCard

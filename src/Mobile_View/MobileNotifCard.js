import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import MobileEditVerseModal from './MobileEditVerseModal';
import './MobileNotifCard.css';

function MobileNotifCard({ user, imageUrl, title, date, message, id }) {

    const [displayName, setDisplayName] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setDisplayName('');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [displayName]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('announce').doc(id).delete().then(() => {
                console.log('Announcement Successfully Deleted')
                alert('Deleted Successfully!');
            }).catch((error) => {
                console.error('Error Removing Announcement', error)
            })
        } else {
            console.log('Not Deleted!')
        }
    }

    return (
        <div className='MobileNotifCard'>
            <img className="MobileNotifCard__thumbnail" src={imageUrl} alt="thumbnail" />
            <div>
                {displayName === 'KidifyAdmin2021' ? (
                    <div className="MobileAdmin__Buttons">
                        <button className='EditButton' onClick={() => setShow(true)}>Edit</button>
                        <button className='DeleteButton' onClick={handleDelete}>Delete</button>
                    </div>) : (
                    <div></div>
                )}
            </div>
            <div className="MobileEditModal">
                <MobileEditVerseModal onClose={() => setShow(false)} show={show} id={id} />
            </div>
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

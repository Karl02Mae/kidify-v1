import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import EditAnnounceModal from './EditAnnounceModal';
import './NotifCard.css';


function NotifCard({ user, imageUrl, title, date, message, id }) {

    const [admin, setAdmin] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setAdmin(authUser);
            } else {
                //user is logged out
                setAdmin(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [admin]);


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
        <div className="NotifCard">
            <img className="NotifCard__thumbnail" src={imageUrl} alt="thumbnail" height="200px" />
            <div>
                {admin ? (
                    <div className="Admin__Buttons">
                        <button className='EditButton' onClick={() => setShow(true)}>Edit</button>
                        <button className='DeleteButton' onClick={handleDelete}>Delete</button>
                    </div>) : (
                    <div></div>
                )}
            </div>
            <div className="editModal">
                <EditAnnounceModal onClose={() => setShow(false)} show={show} id={id} />
            </div>
            <div className="Notif__info">
                <div className="Notif__text">
                    <h4>{title}</h4>
                    <p className="Notif__text__uid">{user}</p>
                    <p className="Notif__text__time">{date}</p>
                    <p className="Notif__text__message">{message}</p>

                </div>
            </div>


        </div>
    )
}

export default NotifCard

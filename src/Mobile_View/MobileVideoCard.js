import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';
import Dummy from '../imgs/1111.jpg';
import MobileEditVideoModal from './MobileEditVideoModal';
import './MobileVideoCard.css';

function MobileVideoCard({ videoTitle, videoDate, id }) {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                setDisplayName('');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('videos').doc(id).delete().then(() => {
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
        <div className='mobileVideoCard'>
            <Link to={{ pathname: `/play/${id}/` }}>
                <img className="mobileVideoCard__thumbnail"
                    src={Dummy}
                    alt="Thumbnail"
                    height="200px"
                />
            </Link>
            <div>
                {displayName === 'KidifyAdmin2021' ? (
                    <div className='Admin__Buttons'>
                        <button onClick={() => setShow(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                ) : (
                    <div></div>
                )}

            </div>
            <div className='Modal'>
                <MobileEditVideoModal onClose={() => setShow(false)} show={show} id={id} />
            </div>
            <div className="mobileVideo__info">
                <div className="mobileVideo__text">
                    <Link to={{ pathname: `/play/${id}/` }}>
                        <h4>{videoTitle}</h4>
                    </Link>
                    <p>
                        {videoDate}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MobileVideoCard

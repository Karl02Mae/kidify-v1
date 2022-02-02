import React, { useState } from 'react';
import './MobileAdminJournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import MobileJournalContentModal from './MobileJournalContentModal';
import { db } from '../firebase';

function MobileAdminJournalCard({ content, date, title, userImage, username, id }) {
    const [show, setShow] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('journals').doc(id).delete().then(() => {
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
        <div className='MobileJournalCardCont'>
            <button className='MobileDeleteJournal' onClick={handleDelete}>Delete</button>
            <div className='Mobileuser' onClick={() => setShow(true)}>
                <Avatar className='MobileUserAvatar' src={userImage} alt={username} />
                <h4 className='MobilejournalUser'>{username}</h4>
            </div>
            <h4 className='MobilejournalTitle' onClick={() => setShow(true)}>Title: {title}</h4>
            <h4 className='MobilejournalDate'>{date}</h4>
            <MobileJournalContentModal show={show} content={content} />
        </div>
    )
}

export default MobileAdminJournalCard

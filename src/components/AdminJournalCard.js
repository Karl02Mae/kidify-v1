import React, { useState } from 'react';
import './AdminJournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import JournalContentModal from './JournalContentModal';
import { db } from '../firebase';

function AdminJournalCard({ content, date, title, userImage, username, id }) {

    const [show, setShow] = useState(false);

    const handleModal = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

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
        <div className='JournalCardCont'>
            <div className='user' onClick={handleModal}>
                <Avatar src={userImage} alt={username} />
                <h4 className='journaltext'>{username}</h4>
            </div>
            <h4 className='journaltitle' onClick={handleModal}>{title}</h4>
            <h4 className='journaltext'>{date}</h4>
            <button className='DeleteJournal' onClick={handleDelete}>Delete</button>
            <JournalContentModal onClose={() => setShow(false)} show={show} content={content} />
        </div>
    )
}

export default AdminJournalCard

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import MobileMyJournalModal from './MobileMyJournalModal';
import { db } from '../firebase';
import './MobileMyJournalCard.css';
import MobileMyJournalEdit from './MobileMyJournalEdit';

function MobileMyJournalCard({ content, date, title, userImage, username, id }) {

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

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
        <div className='MobileMyJournalCardCont'>
            <div className='MobileMyUser' onClick={() => setShow(true)}>
                <Avatar src={userImage} alt={username} />
                <h4 className='MobileMyJournalUser'>{username}</h4>
            </div>
            <h4 className='MobileMyJournalTitle' onClick={() => setShow(true)}>Title: {title}</h4>
            <h4 className='MobileMyJournalDate'>{date}</h4>
            <div className='MobileMyJournalButtons'>
                <button className='MobileMyJournalEdit' onClick={() => setShowEdit(true)}>Edit</button>
                <button className='MobileMyJournalDelete' onClick={handleDelete}>Delete</button>
            </div>
            <div className='MobileMyJournalEditCont'>
                <MobileMyJournalEdit onClose={() => setShowEdit(false)} showEdit={showEdit} id={id} />
            </div>
            <MobileMyJournalModal onClose={() => setShow(false)} show={show} content={content} />
        </div>
    )
}

export default MobileMyJournalCard

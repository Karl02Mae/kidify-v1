import React, { useState } from 'react';
import './JournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import MyJournalModal from './MyJournalModal';
import EditMyJournal from './EditMyJournal';
import { db } from '../firebase';

function JournalCard({ content, date, title, userImage, username, id }) {

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
        <div className='MyJournalCardCont'>
            <div className='myUser' onClick={() => setShow(true)}>
                <Avatar src={userImage} alt={username} />
                <h4 className='MyJournalUser'>{username}</h4>
            </div>
            <h4 className='MyJournalTitle' onClick={() => setShow(true)}>{title}</h4>
            <h4 className='MyJournalDate'>{date}</h4>
            <div className='MyJournalButtons'>
                <button onClick={() => setShowEdit(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div className='MyJournalEdit'>
                <EditMyJournal onClose={() => setShowEdit(false)} showEdit={showEdit} id={id} />
            </div>
            <MyJournalModal onClose={() => setShow(false)} show={show} content={content} />
        </div>
    )
}

export default JournalCard

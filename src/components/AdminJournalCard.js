import React, { useState } from 'react';
import './AdminJournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import JournalContentModal from './JournalContentModal';

function AdminJournalCard({ content, date, title, userImage, username }) {

    const [show, setShow] = useState(false);

    const handleModal = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

    return (
        <div className='JournalCardCont' onClick={handleModal}>
            <div className='user'>
                <Avatar src={userImage} alt={username} />
                <h4 className='journalUser'>{username}</h4>
            </div>
            <h4 className='journalTitle'>{title}</h4>
            <h4 className='journalDate'>{date}</h4>
            <JournalContentModal show={show} content={content} />
        </div>
    )
}

export default AdminJournalCard

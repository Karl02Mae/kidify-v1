import React, { useState } from 'react';
import './JournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import MyJournalModal from './MyJournalModal';

function JournalCard({ content, date, title, userImage, username }) {

    const [show, setShow] = useState(false);

    const handleModal = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

    return (
        <div className='MyJournalCardCont' onClick={handleModal}>
            <div className='myUser'>
                <Avatar src={userImage} alt={username} />
                <h4 className='MyJournalUser'>{username}</h4>
            </div>
            <h4 className='MyJournalTitle'>{title}</h4>
            <h4 className='MyJournalDate'>{date}</h4>
            <MyJournalModal show={show} content={content} />
        </div>
    )
}

export default JournalCard

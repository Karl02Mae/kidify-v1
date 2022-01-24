import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import MobileMyJournalModal from './MobileMyJournalModal';
import './MobileMyJournalCard.css';

function MobileMyJournalCard({ content, date, title, userImage, username }) {

    const [show, setShow] = useState(false);

    const handleModal = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

    return (
        <div className='MobileMyJournalCardCont' onClick={handleModal}>
            <div className='MobileMyUser'>
                <Avatar src={userImage} alt={username} />
                <h4 className='MobileMyJournalUser'>{username}</h4>
            </div>
            <h4 className='MobileMyJournalTitle'>{title}</h4>
            <h4 className='MobileMyJournalDate'>{date}</h4>
            <MobileMyJournalModal show={show} content={content} />
        </div>
    )
}

export default MobileMyJournalCard

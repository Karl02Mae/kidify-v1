import React, { useState } from 'react';
import './MobileAdminJournalCard.css';
import Avatar from '@material-ui/core/Avatar';
import MobileJournalContentModal from './MobileJournalContentModal';

function MobileAdminJournalCard({ content, date, title, userImage, username }) {
    const [show, setShow] = useState(false);

    const handleModal = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    }

    return (
        <div className='MobileJournalCardCont' onClick={handleModal}>
            <div className='Mobileuser'>
                <Avatar className='MobileUserAvatar' src={userImage} alt={username} />
                <h4 className='MobilejournalUser'>{username}</h4>
            </div>
            <h4 className='MobilejournalTitle'>{title}</h4>
            <h4 className='MobilejournalDate'>{date}</h4>
            <MobileJournalContentModal show={show} content={content} />
        </div>
    )
}

export default MobileAdminJournalCard

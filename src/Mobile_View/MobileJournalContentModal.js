import React from 'react';
import './MobileJournalContentModal.css';

function MobileJournalContentModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='MobileContentModal'>
                <h4>{props.content}</h4>
                <h4 className='MobileClose'>Click again to close.</h4>
            </div>
        )
    }
}

export default MobileJournalContentModal

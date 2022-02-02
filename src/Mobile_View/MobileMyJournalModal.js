import React from 'react';
import './MobileMyJournalModal.css';

function MobileMyJournalModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='MobileMyJournalModal'>
                <h4>{props.content}</h4>
                <button onClick={props.onClose} className='Close'>Close</button>
            </div>
        )
    }
}

export default MobileMyJournalModal

import React from 'react';
import './MyJournalModal.css';

function MyJournalModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='MyJournalModal'>
                <h4>{props.content}</h4>
                <button className='Close' onClick={props.onClose}>Close</button>
            </div>
        )
    }
}

export default MyJournalModal

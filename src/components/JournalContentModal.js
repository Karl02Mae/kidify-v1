import React from 'react';
import './JournalContentModal.css';

function JournalContentModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='contentModal'>
                <h4>{props.content}</h4>
                <button className='Close' onClick={props.onClose}>Close</button>
            </div>
        )
    }
}

export default JournalContentModal

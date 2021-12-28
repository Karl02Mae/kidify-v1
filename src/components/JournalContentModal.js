import React from 'react';
import './JournalContentModal.css';

function JournalContentModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='contentModal'>
                <h4>{props.content}</h4>
                <h4 className='Close'>Click again to close.</h4>
            </div>
        )
    }
}

export default JournalContentModal

import React from 'react';
import './MyJournalModal.css';

function MyJournalModal(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <div className='MyJournalModal'>
                <h4>{props.content}</h4>
                <h4 className='Close'>Click again to close.</h4>
            </div>
        )
    }
}

export default MyJournalModal

import React, { useState } from 'react';
import { db } from '../firebase';
import './MobileMyJournalEdit.css';

function MobileMyJournalEdit(props) {
    
    const [newTitle, setNewTitle] = useState('');
    const [newCont, setNewCont] = useState('');

    const handleEdit = () => {
        if (newTitle === '' || newCont === '') {
            alert('Please Fill all details!');
        } else {
            db.collection('journals').doc(props.id).update({
                journal_title: newTitle,
                journal_content: newCont,
            })

            alert('Editted Successfully!');
            setNewTitle('');
            setNewCont('');
        }
    }

    if (props.showEdit === false) {
        return null;
    } else if (props.showEdit === true) {
        return (
            <div className='MobileJournalEditRoot'>
                <div className='MobileJournalEditBoxes'>
                    <h1>Enter New Title </h1>
                    <input type='text' placeholder='Enter Title' onChange={event => setNewTitle(event.target.value)} value={newTitle} />
                    <h1>Enter New Content</h1>
                    <textarea type='text' placeholder='Enter Content' onChange={event => setNewCont(event.target.value)} value={newCont} />
                </div>
                <div className='MobileJournalEditButtons'>
                    <button className='MobileMyJournalSubmit' onClick={() => { handleEdit(); props.onClose(); }}>Submit</button>
                    <button className='MobileMyJournalCancel' onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        )
    }

}

export default MobileMyJournalEdit;

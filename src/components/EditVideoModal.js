import React, { useState } from 'react';
import { db } from '../firebase';
import './EditVideoModal.css';

function EditVideoModal(props) {

    const handleEdit = () => {
        if (newTitle === '' || newCapt === '') {
            alert('Please Fill all details!');
        } else {
            db.collection('videos').doc(props.id).update({
                videoTitle: newTitle,
                videoCaption: newCapt,
            })

            alert('Editted Successfully!');
            setNewTitle('');
            setNewCapt('');
        }
    }

    const [newTitle, setNewTitle] = useState('');
    const [newCapt, setNewCapt] = useState('');


    if (props.show === false) {
        return null
    } else if (props.show === true) {
        return (
            <div className='videoRoot'>
                <div className='videoTextBoxes'>
                    <h1>Enter New Title </h1>
                    <input type='text' placeholder='Enter Title' onChange={event => setNewTitle(event.target.value)} value={newTitle} />
                    <h1>Enter New Caption</h1>
                    <textarea type='text' placeholder='Enter Caption' onChange={event => setNewCapt(event.target.value)} value={newCapt} />
                </div>
                <div className='videoButtons'>
                    <button className='videoSubmit' onClick={() => { handleEdit(); props.onClose(); }}>Submit</button>
                    <button className='videoCancel' onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default EditVideoModal;

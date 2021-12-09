import React, { useState } from 'react';
import { db } from '../firebase';
import './EditAnnounceModal.css';

function EditAnnounceModal(props) {

    const handleEdit = () => {
        if (newTitle === '' || newCapt === '') {
            alert('Please Input new Details!');
        } else {
            db.collection('announce').doc(props.id).update({
                title: newTitle,
                caption: newCapt,
            })

            alert('Editted Successfully!')
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
            <div className='root'>
                <div className='TextBoxes'>
                    <h1>Enter New Title </h1>
                    <input type='text' placeholder='Enter Title' onChange={event => setNewTitle(event.target.value)} value={newTitle} />
                    <h1>Enter New Caption</h1>
                    <textarea type='text' placeholder='Enter Caption' onChange={event => setNewCapt(event.target.value)} value={newCapt} />
                </div>
                <div className='Buttons'>
                    <button className='submit' onClick={() => { handleEdit(); props.onClose(); }}>Submit</button>
                    <button className='cancel' onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default EditAnnounceModal

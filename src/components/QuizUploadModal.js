import React, { useState } from 'react';
import './QuizUploadModal.css';
import { db } from '../firebase';

function QuizUploadModal(props) {

    const [title, setTitle] = useState('');
    const [q1, setQ1] = useState('');
    const [q1a, setQ1a] = useState('');
    const [q2, setQ2] = useState('');
    const [q2a, setQ2a] = useState('');
    const [q3, setQ3] = useState('');
    const [q3a, setQ3a] = useState('');
    const [q4, setQ4] = useState('');
    const [q4a, setQ4a] = useState('');
    const [q5, setQ5] = useState('');
    const [q5a, setQ5a] = useState('');


    const handleSubmit = () => {
        if (q1 === '' || q1a === '' || q2 === '' || q2a === '' || q3 === '' || q3a === '' || q4 === '' || q4a === '' || q5 === '' || q5a === '' || title === '') {
            alert('Please Fill all Forms!');
        } else {
            db.collection('QuizQuest').add({
                Title: title,
                Q1: q1,
                Q1A: q1a,
                Q2: q2,
                Q2A: q2a,
                Q3: q3,
                Q3A: q3a,
                Q4: q4,
                Q4A: q4a,
                Q5: q5,
                Q5A: q5a,
            }).catch((error) => {
                console.log(error);
            });

            alert('Successfully Submitted!');
            setQ1('');
            setQ1a('');
            setQ2('');
            setQ2a('');
            setQ3('');
            setQ3a('');
            setQ4('');
            setQ4a('');
            setQ5('');
            setQ5a('');
            setTitle('');
        }
    }

    if (props.show === true) {
        return (
            <div className='QuizUploadCont'>
                <h3>Title: </h3>
                <input className='QuizTitle' type='text' placeholder='Enter Quiz Title' onChange={(e) => setTitle(e.target.value)} value={title} />
                <h3>Question 1:</h3>
                <input className='QuizQuest1' type='text' placeholder='Question 1' onChange={(e) => setQ1(e.target.value)} value={q1} />
                <h3>Correct Answer:</h3>
                <input className='QuizQuest1Ans' type='text' placeholder='Answer for Question 1 (PLEASE TYPE IN ALL CAPITAL LETTERS)' onChange={(e) => setQ1a(e.target.value)} value={q1a} />
                <h3>Question 2:</h3>
                <input className='QuizQuest2' type='text' placeholder='Question 2 ' onChange={(e) => setQ2(e.target.value)} value={q2} />
                <h3>Correct Answer:</h3>
                <input className='QuizQuest2Ans' type='text' placeholder='Answer for Question 2 (PLEASE TYPE IN ALL CAPITAL LETTERS)' onChange={(e) => setQ2a(e.target.value)} value={q2a} />
                <h3>Question 3:</h3>
                <input className='QuizQuest3' type='text' placeholder='Question 3' onChange={(e) => setQ3(e.target.value)} value={q3} />
                <h3>Correct Answer:</h3>
                <input className='QuizQuest3Ans' type='text' placeholder='Answer for Question 3 (PLEASE TYPE IN ALL CAPITAL LETTERS)' onChange={(e) => setQ3a(e.target.value)} value={q3a} />
                <h3>Question 4:</h3>
                <input className='QuizQuest4' type='text' placeholder='Question 4' onChange={(e) => setQ4(e.target.value)} value={q4} />
                <h3>Correct Answer:</h3>
                <input className='QuizQuest4Ans' type='text' placeholder='Answer for Question 4 (PLEASE TYPE IN ALL CAPITAL LETTERS)' onChange={(e) => setQ4a(e.target.value)} value={q4a} />
                <h3>Question 5:</h3>
                <input className='QuizQuest5' type='text' placeholder='Question 5' onChange={(e) => setQ5(e.target.value)} value={q5} />
                <h3>Correct Answer:</h3>
                <input className='QuizQuest5Ans' type='text' placeholder='Answer for Question 5 (PLEASE TYPE IN ALL CAPITAL LETTERS)' onChange={(e) => setQ5a(e.target.value)} value={q5a} />
                <div className='Buttons'>
                    <button className='QuizSubmit' onClick={handleSubmit}>Submit</button>
                    <button className='QuizCancel' onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default QuizUploadModal;

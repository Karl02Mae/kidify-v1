import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import QuizScoreCard from './QuizScoreCard';
import './QuizScores.css';

function QuizScores() {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        db.collection('QuizScores').orderBy('Date', 'desc').onSnapshot(snapshot => {
            setScores(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <div className='QuizScoresCont'>
            <h2>Quiz Scores</h2>
            <div className='QuizScoreCard__Cont'>
                {
                    scores.map(({ id, data }) => {
                        return <QuizScoreCard
                            key={id}
                            id={id}
                            Date={data.Date}
                            Username={data.Username}
                            Score={data.Score}
                            Title={data.QuizTitle}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default QuizScores;

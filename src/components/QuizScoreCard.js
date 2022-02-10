import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import './QuizScoreCard.css';

function QuizScoreCard(props) {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                setDisplayName('');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName]);

    const handleDel = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('QuizScores').doc(props.id).delete().then(() => {
                console.log('Announcement Successfully Deleted')
                alert('Deleted Successfully!');
            }).catch((error) => {
                console.error('Error Removing Announcement', error)
            })
        } else {
            console.log('Not Deleted!')
        }
    }

    return (
        <div className='QuizScoreCardCont'>
            <div className='QuizScores'>
                <h4 className='QuizScore__Title'>Quiz Title: {props.Title}</h4>
                <h4 className='QuizScore__Username'>Username: {props.Username}</h4>
                <h4 className='QuizScore__Score'>Score: {props.Score}/5</h4>
                <h4 className='QuizScore__Date>'>Date: {props.Date}</h4>
            </div>
            {displayName === 'KidifyAdmin2021' || displayName === 'ImaculadaConception' ? (
                <div className='QuizAdmin__Buttons'>
                    <button className='DeleteQuizScore' onClick={handleDel}>Delete</button>
                </div>
            ) : (
                <div></div>
            )}

        </div>
    )
}

export default QuizScoreCard;

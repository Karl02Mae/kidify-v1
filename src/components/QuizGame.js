import React, { useState, useEffect } from 'react';
import './QuizGame.css';
import QuizUploadModal from './QuizUploadModal';
import { auth, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import QuizCard from './QuizCard';

function QuizGame() {

    const [show, setShow] = useState(false);
    const [user, setUser] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [quest, setQuest] = useState([]);
    const history = useHistory();

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
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, displayName, history]);

    useEffect(() => {
        db.collection('QuizQuest').orderBy('Title', 'desc').onSnapshot(snapshot => {
            setQuest(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, [])


    return (
        <div className='QuizGame__Cont'>
            <h2>Quiz Game</h2>
            {displayName === 'KidifyAdmin2021' || displayName === 'ImaculadaConception' ? (
                <div className='QuizGame__adminFunc'>
                    <button className='adminFunc__addQuiz' onClick={() => setShow(true)}>Add Quiz</button>
                </div>
            ) : (<div></div>)}
            <QuizUploadModal onClose={() => setShow(false)} show={show} />
            <div className='Quizzes'>
                {
                    quest.map(({ id, data }) => {
                        return <QuizCard
                            key={id}
                            id={id}
                            q1={data.Q1}
                            q1a={data.Q1A}
                            q2={data.Q2}
                            q2a={data.Q2A}
                            q3={data.Q3}
                            q3a={data.Q3A}
                            q4={data.Q4}
                            q4a={data.Q4A}
                            q5={data.Q5}
                            q5a={data.Q5A}
                            title={data.Title}
                            username={displayName}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default QuizGame;

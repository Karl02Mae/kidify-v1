import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import './QuizCard.css'
import QuizPlayModal from './QuizPlayModal';

function QuizCard(props) {

    const [user, setUser] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [show, setShow] = useState(false);
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

    const handleClick = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('QuizQuest').doc(props.id).delete().then(() => {
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
        <div className='QuizCardCont'>
            <div className='QuizTitle'>
                <h2 className='QuizTitle__Title' onClick={() => setShow(true)}>Title: {props.title}</h2>
            </div>
            {displayName === 'KidifyAdmin2021' ? (
                <button className='QuizDel' onClick={handleClick}>Delete</button>
            ) : (<div></div>)}
            <QuizPlayModal
                onClose={() => setShow(false)}
                show={show}
                title={props.title}
                q1={props.q1}
                q1a={props.q1a}
                q2={props.q2}
                q2a={props.q2a}
                q3={props.q3}
                q3a={props.q3a}
                q4={props.q4}
                q4a={props.q4a}
                q5={props.q5}
                q5a={props.q5a}
            />
        </div>
    )
}

export default QuizCard;

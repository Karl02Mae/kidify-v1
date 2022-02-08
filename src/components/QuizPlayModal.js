import React, { useState, useEffect } from 'react';
import './QuizPlayModal.css';

function QuizPlayModal(props) {

    const [q1Ans, setq1Ans] = useState('');
    const [q2Ans, setq2Ans] = useState('');
    const [q3Ans, setq3Ans] = useState('');
    const [q4Ans, setq4Ans] = useState('');
    const [q5Ans, setq5Ans] = useState('');
    const [s1, setS1] = useState(0);
    const [s2, setS2] = useState(0);
    const [s3, setS3] = useState(0);
    const [s4, setS4] = useState(0);
    const [s5, setS5] = useState(0);
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() => {
        if (q1Ans === props.q1a) {
            setS1(1);
        }
        if (q2Ans === props.q2a) {
            setS2(1);
        }
        if (q3Ans === props.q3a) {
            setS3(1);
        }
        if (q4Ans === props.q4a) {
            setS4(1);
        }
        if (q5Ans === props.q5a) {
            setS5(1);
        }

        setTotalScore(s1 + s2 + s3 + s4 + s5);
    }, [q1Ans, q2Ans, q3Ans, q4Ans, q5Ans, totalScore, props, s1, s2, s3, s4, s5])

    const handleSubmit = () => {

        alert('Your total Score is ' + totalScore + '/5.');
        setq1Ans('');
        setq2Ans('');
        setq3Ans('');
        setq4Ans('');
        setq5Ans('');
        setS1(0);
        setS2(0);
        setS3(0);
        setS4(0);
        setS5(0);
        setTotalScore(0);
    }

    if (props.show === true) {
        return (
            <div className='QuizPlayCont'>
                <div className='Quests'>
                    <h4>Title: {props.title}</h4>
                    <h4>Question 1: {props.q1}</h4>
                    <input
                        type='text'
                        className='Q1Answer'
                        onChange={(e) => setq1Ans(e.target.value)}
                        value={q1Ans}
                        placeholder='Answer (Please type in ALL CAPITAL LETTERS)'
                    />
                    <h4>Question 2: {props.q2}</h4>
                    <input
                        type='text'
                        className='Q2Answer'
                        onChange={(e) => setq2Ans(e.target.value)}
                        value={q2Ans}
                        placeholder='Answer (Please type in ALL CAPITAL LETTERS)'
                    />
                    <h4>Question 3: {props.q3}</h4>
                    <input
                        type='text'
                        className='Q3Answer'
                        onChange={(e) => setq3Ans(e.target.value)}
                        value={q3Ans}
                        placeholder='Answer (Please type in ALL CAPITAL LETTERS)'
                    />
                    <h4>Question 4: {props.q4}</h4>
                    <input
                        type='text'
                        className='Q4Answer'
                        onChange={(e) => setq4Ans(e.target.value)}
                        value={q4Ans}
                        placeholder='Answer (Please type in ALL CAPITAL LETTERS)'
                    />
                    <h4>Question 5: {props.q5}</h4>
                    <input
                        type='text'
                        className='Q5Answer'
                        onChange={(e) => setq5Ans(e.target.value)}
                        value={q5Ans}
                        placeholder='Answer (Please type in ALL CAPITAL LETTERS)'
                    />
                </div>
                <div className='QuizButtons'>
                    <button className='QuizPlaySubmit' onClick={handleSubmit}>Submit</button>
                    <button className='QuizClose' onClick={props.onClose}>Close</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default QuizPlayModal;

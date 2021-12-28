import React, { useState, useEffect } from 'react';
import './Journal.css';

import { auth, db } from '../firebase';
import { useHistory } from 'react-router-dom';

function Journal() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');
    const history = useHistory();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
                setUserImage(authUser.photoURL);
                setDisplayName(authUser.displayName);
            } else {
                //user is logged out
                setUser(null);
                setUserImage(null);
                setDisplayName('');
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, userImage, displayName, history]);

    const handleClick = () => {
        if (title === '' || content === '' || displayName === '') {
            alert('please fill all forms!')
        } else {
            db.collection('journals').add({
                journal_content: content,
                journal_date: date,
                journal_title: title,
                userImage: userImage,
                username: displayName
            }).catch((error) => {
                console.log(error);
            });

            alert('Successfully Submitted!')
            setContent('');
            setTitle('');
        }
    }

    return (
        <div className='JournalCont'>
            <div className='Journal'>
                <h2 className='JournalTitle'>Journal</h2>
                <h3 className='JournalVideoTitle'>for video titled: </h3>
                <input
                    type='text'
                    className='videoTitleInput'
                    placeholder='Title of video to write Journal for'
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                />
                <h3 className='JournalContent'>Content</h3>
                <textarea
                    type='text'
                    className='videoContentInput'
                    placeholder='Your Journal'
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
                <button
                    className='JournalSubmit'
                    onClick={handleClick}
                >Submit</button>
            </div>
        </div>
    )
}

export default Journal

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../firebase';
import JournalCard from './JournalCard';
import './MyJournal.css';


function MyJournal() {

    const [myJournals, setMyJournals] = useState([]);
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');

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
        db.collection('journals').orderBy('journal_date', 'desc').onSnapshot(snapshot => {
            setMyJournals(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <div className='MyJournalRoot'>
            <h3 className='My__Journals'>My Journals</h3>
            <div className='My__JournalList_Header'>
                <h3 className='MyJournalListUsername'>Username</h3>
                <h3 className='MyJournalListTitle'>Title</h3>
                <h3 className='MyJournalListDate'>Date</h3>
            </div>
            <div className='My__JournalList'>
                {myJournals.map(({ id, data }) => {
                    if (displayName === data.username) {
                        return <JournalCard
                            key={id}
                            id={id}
                            content={data.journal_content}
                            date={data.journal_date}
                            title={data.journal_title}
                            userImage={data.userImage}
                            username={data.username}
                        />
                    }
                    return <div key={id}></div>
                })
                }
            </div>
        </div>
    )
}

export default MyJournal

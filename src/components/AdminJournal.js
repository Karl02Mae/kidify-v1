import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import AdminJournalCard from './AdminJournalCard';
import './AdminJournal.css';

function AdminJournal() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        db.collection('journals').orderBy('journal_date', 'desc').onSnapshot(snapshot => {
            setJournals(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <div className='AdminJournalCont'>
            <h3 className='Journals'>All Journals</h3>
            <div className='JournalListHeader'>
                <h3 className='JournalListUser'>Username</h3>
                <h3 className='JournalListTitle'>Title</h3>
                <h3 className='JournalListDate'>Date</h3>
            </div>
            <div className='JournalList'>
                {
                    journals.map(({ id, data }) => (
                        <AdminJournalCard
                            key={id}
                            id={id}
                            content={data.journal_content}
                            date={data.journal_date}
                            title={data.journal_title}
                            userImage={data.userImage}
                            username={data.username}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminJournal

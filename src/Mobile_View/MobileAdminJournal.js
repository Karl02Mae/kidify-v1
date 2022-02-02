import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import MobileAdminJournalCard from './MobileAdminJournalCard';
import './MobileAdminJournal.css';
import { useHistory } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MobileAdminJournal() {
    const [journals, setJournals] = useState([]);
    const history = useHistory();

    useEffect(() => {
        db.collection('journals').orderBy('journal_date', 'desc').onSnapshot(snapshot => {
            setJournals(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <div className='MobileAdminJournalCont'>
            <ArrowBackIcon className='JournalContBack' onClick={() => history.push('/')} />
            <div className='MobileJournaltContentCont'>
                <h3 className='MobileJournals'>Journals</h3>
                <div className='MobileJournalList'>
                    {
                        journals.map(({ id, data }) => (
                            <MobileAdminJournalCard
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
        </div>
    )
}

export default MobileAdminJournal

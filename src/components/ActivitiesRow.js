import React from 'react';
import './ActivitiesRow.css';

function ActivitiesRow({ Icon, Title }) {
    return (
        <div className='ActRowCont'>
            < Icon className='ActIcon' />
            <h2 className='ActTitle'>{Title}</h2>
        </div>
    )
}

export default ActivitiesRow

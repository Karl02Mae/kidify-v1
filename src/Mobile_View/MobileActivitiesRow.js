import React from 'react';
import './MobileActivitiesRow.css';

function MobileActivitiesRow({ Icon, Title }) {
    return (
        <div className='MobileActivitiesRoot'>
            < Icon className='MobileActIcon' />
            <h3 className='MobileActivitiesTITLE'>{Title}</h3>
        </div>
    )
}

export default MobileActivitiesRow

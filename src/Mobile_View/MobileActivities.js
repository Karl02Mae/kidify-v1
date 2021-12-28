import React from 'react';
import './MobileActivities.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MobileActivitiesRow from './MobileActivitiesRow';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { useHistory } from 'react-router-dom';

function MobileActivities() {
    const history = useHistory();
    return (
        <div className='MobileActivitesContainer'>
            <ArrowBackIcon className='BackArrowMobile' onClick={() => history.push('/')} />
            <div className='ContentsMobile'>
                <h2 className='MobileActivitiesTitle'>Activities</h2>
                <Link to='/journal'><MobileActivitiesRow Icon={MenuBookIcon} Title='Journal' /></Link>
            </div>
        </div>
    )
}

export default MobileActivities;

import React from 'react';
import './Activities.css';
import ActivitiesRow from './ActivitiesRow';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from 'react-router-dom';

function Activities() {
    return (
        <div className='ActivitesContainer'>
            <h2 className='ActivitiesTitle'>Activities</h2>
            <Link to='/journal'><ActivitiesRow Icon={MenuBookIcon} Title='Add Journal' /></Link>
            <Link to='/myjournal'><ActivitiesRow Icon={MenuBookIcon} Title='My Journals' /></Link>
            <Link to='/quiz'><ActivitiesRow Icon={QuizIcon} Title='Quiz Game' /></Link>
        </div>
    )
}

export default Activities

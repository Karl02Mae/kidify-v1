import React from 'react';
import './AboutUs.css';

import Church from '../imgs/Church_Logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import karl from '../imgs/karl.jpg';
import mae from '../imgs/mae.jpg';
import eloi from '../imgs/eloi.jpg';
import welyam from '../imgs/welyam.jpg';

function AboutUs() {
    return (
        <div className='AboutContainer'>
            <h2 className='AboutTitle'>About Us</h2>
            <div className='Church'>
                <div className='Church__Name__Cont'>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <img className='Church__Logo' src={Church} alt='Church Logo' height='50px' width='50px' />
                    </a>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <h3 className='Church__Name'>Holy Family Christian Church</h3>
                    </a>
                </div>
                <div className='Church__Location__Cont'>
                    <LocationOnIcon className='Church__Location__Logo' alt='location' />
                    <h3 className='Church__Location'>175, San Roque, San Luis, Pampanga</h3>
                </div>
                <div className='Church__Email__Cont'>
                    <EmailIcon className='Church__Email__Logo' alt='email' />
                    <h3 className='Church__Email'>ernand163@gmail.com</h3>
                </div>
                <div className='Church__Description__Cont'>
                    <InfoIcon className='Church__Description__Logo' alt='Logo' />
                    <h3 className='Church__Description'>"HFCC is a church that Loves God, make Disciples, and wants to change this nation."</h3>
                </div>
            </div>
            <div className='DevContainer'>
                <div className='MainDev'>
                    <h3 className='devText'>Main Developer</h3>
                    <div className='avaCont'>
                        <a href='https://www.facebook.com/zuesmariozip.2nd'>
                            <Avatar
                                alt='Karl Christopher Samelo'
                                src={karl}
                                className='devAvatar'
                            />
                        </a>
                        <a href='https://www.facebook.com/zuesmariozip.2nd'>
                            <h3 className='devName'>Karl Christopher Samelo</h3>
                        </a>
                    </div>
                </div>
                <div className='UIDesigner'>
                    <h3 className='devText'>UI Designer</h3>
                    <div className='avaCont'>
                        <a href='https://www.facebook.com/rhusselmhae.limas'>
                            <Avatar
                                alt='Russel Mae Limas'
                                src={mae}
                                className='devAvatar'
                            />
                        </a>
                        <a href='https://www.facebook.com/rhusselmhae.limas'>
                            <h3 className='devName'>Russel May Limas</h3>
                        </a>
                    </div>
                </div>
                <div className='CapsMember'>
                    <h3 className='devText'>Members</h3>
                    <div className='avaCont'>
                        <a href='https://www.facebook.com/eloisa.d.paguio'>
                            <Avatar
                                alt='Eloisa Paguio'
                                src={eloi}
                                className='devAvatar'
                            />
                        </a>
                        <a href='https://www.facebook.com/eloisa.d.paguio'>
                            <h3 className='devName'>Eloisa Paguio</h3>
                        </a>
                    </div>
                </div>
                <div className='CapsMember'>
                    <div className='avaCont'>
                        <a href='https://www.facebook.com/ar1se.Mgns'>
                            <Avatar
                                alt='William Santos'
                                src={welyam}
                                className='devAvatar'
                            />
                        </a>
                        <a href='https://www.facebook.com/ar1se.Mgns'>
                            <h3 className='devName'>William Santos</h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs

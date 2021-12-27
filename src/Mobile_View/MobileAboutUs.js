import React from 'react';
import './MobileAboutUs.css';
import ChurchLogo from '../imgs/Church_Logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import Logo from '../imgs/logo.png';

function MobileAboutUs() {
    return (
        <div className='AboutUsRoot'>
            <div className='ChurchDetails'>
                <div className='AU__ChurchName'>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <img src={ChurchLogo} alt='logo' height='100px' width='100px' />
                    </a>
                    <a href='https://www.facebook.com/Holy-Family-Christian-Church-San-Roque-102881085108190'>
                        <h2 className='AboutUsText'>Holy Family Christian Church</h2>
                    </a>
                </div>
                <div className='AU__ChurchLoc'>
                    <LocationOnIcon />
                    <h2 className='AboutUsText2'>175, San Roque, San Luis, Pampanga</h2>
                </div>
                <div className='AU__ChurchEmail'>
                    <EmailIcon />
                    <h2 className='AboutUsText2'>ernand163@gmail.com</h2>
                </div>
                <div className='AU__Desc'>
                    <InfoIcon />
                    <h2 className='AboutUsText2'>"Holy Family Christian Church is a Church that loves God, makes Disciples, and wants to change thit nation."</h2>
                </div>
            </div>
            <div className='DevDetails'>
                <div className='Kidify__Developers'>
                    <img className='LogoLogo' src={Logo} alt='logo' />
                    <h2 className='DevelopersLabel'>Developers</h2>
                </div>
                <div className='DEVS'>
                    <a href='https://www.facebook.com/zuesmariozip.2nd/'><h3 className='NAMES'>Main Developer: Karl Christopher Samelo</h3></a>
                    <a href='https://www.facebook.com/rhusselmhae.limas'><h3 className='NAMES'>UI Designer: Russel May Limas</h3></a>
                    <a href='https://www.facebook.com/eloisa.d.paguio'><h3 className='NAMES'>Capstone Member: Eloisa Paguio</h3></a>
                    <a href='https://www.facebook.com/ar1se.Mgns'><h3 className='NAMES'>Capstone Member: William Santos</h3></a>
                </div>
            </div>
        </div >
    )
}

export default MobileAboutUs

import React, {useState, useContext} from 'react'
import { MainContext } from '../Context'
import {Grid, Typography, Button } from '@material-ui/core'; 
import PersonalInfo from './loanAppPages/PersonalInfo'
import EmploymentInfo from './loanAppPages/EmploymentInfo'
import AppResultsModal from './loanAppPages/AppResultsModal';
import '../Main.css'


function ApplicationForm() {

    const {page, setPage} =useContext(MainContext)
    const [modalOpen, setModalOpen] = useState(false)

  return (
    <Grid container item xs={12} className='main-container'>
        <Grid container className='header-section'>
            <Grid container item xs={10} className='header'>
                <img className='link' style={{height:'100%'}} src={'https://reviews.comparisons.org/personal-loans/assets/images/5ab78124d0ad7a25153a4db5/5b392d4dd0ad7a4044731f99.png'} alt='logo'/>
                <Button>Log In</Button>
            </Grid>
        </Grid>

        <Grid container item xs={12} className='hero'>

            <Grid contianer item xs={12} className='hero-background'>
                <div className='hero-overlay'></div>
                <img src={'https://www.signupgenius.com/cms/socialMediaImages/fun-outdoor-activities-families-1260x6301.jpg'} alt='family' className="hero-img"/>
            </Grid>

            <Grid container item xs={10} md={8} className='main-section-container' style={{display:'flex', marginLeft:'auto', marginRight:'auto'}}>
                <Grid container item xs={12}>
                    <div className='hero-text-container'>
                        <Typography variant='h1' className="hero-text" style={{fontSize:50, fontWeight:'bold'}}>Assisting you with your fiancial needs.</Typography>
                        <Typography variant='h4' className="hero-text">Personal loans up to $10,000</Typography>
                    </div>
                </Grid>

                <Grid contianer item sm={12} md={10} lg={8} className='form-container'>
                    <Typography variant='h2' style={{margin:0, fontSize:40, fontWeight:'bold', width:'100%'}}>Apply now.</Typography>
                    <Typography variant='h5' style={{margin:0, width:'100%'}}>This won't affect your credit.</Typography>
                    <Typography style={{fontSize:'14px', marginTop:20}}>page {page} of 2</Typography>

                    {page === 1 && (
                        <PersonalInfo/>
                    )}
                    {page === 2 && (
                        <EmploymentInfo modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                    )}
                
                </Grid>


            </Grid>

        </Grid>

        <Grid item contianer xs={12} className="footer-top">
            <Typography>Copyright © 2022 PLP Finacial Group. All Rights Reserved</Typography>
            <Typography>Need help? Connect with a branch <span className="link">(888) 555-1212</span> </Typography>
        </Grid>
        <Grid item contianer xs={12} className="footer-bottom">
            <Typography>Terms | Privacy</Typography>
        </Grid>


        <AppResultsModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>



    </Grid>
  )
}

export default ApplicationForm
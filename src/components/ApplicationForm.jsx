import React, {useState, useContext} from 'react'
import { MainContext } from '../Context'
import {Grid, Typography, Button } from '@material-ui/core'; 
import PersonalInfo from './loanAppPages/PersonalInfo'
import EmploymentInfo from './loanAppPages/EmploymentInfo'
import AppResultsModal from './loanAppPages/AppResultsModal';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        flex: 1, backgroundColor:'white'
    },
    headerSection:{
        height:80, backgroundColor:'white', justifyContent:'center'
    },
    header:{
        alignItems:'center', justifyContent:'space-between'
    },
    hero: {
        minHeight:'calc(100vh - 80px)', display:'flex', flexDirection:'row', backgroundColor:'white', position:'relative'
    },
    heroBackground:{
        height:'450px', position:'relative'
    },
    heroOverlay:{
        position:'absolute', width:'100%', height:'100%', backgroundColor:'black', opacity:'25%'
    },
    heroImg:{
        width:'100%', height:'100%', objectFit:'cover', objectPosition:'0px 25%',
    },
    heroTextContainer:{
        width:'100%', height:'300px', display:'flex', flexFlow:'column', justifyContent:'center'
    },
    heroTitle:{
        margin:0, fontSize:50, fontWeight:'bold', color:'#ffffff', width:'100%', textAlign:'center',  textShadow: '2px 2px 8px #000000',
    },
    heroSubTitle:{
        margin:0, color:'#ffffff', width:'100%', textAlign:'center',  textShadow: '2px 2px 8px #000000',
    },
    formContainer: {
        padding:40, backgroundColor:'white', height:'calc(100vh - 500px)', minHeight:650, boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.2)', borderRadius:8,
    },
    formTitle: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },

  }));


function ApplicationForm() {

    const classes = useStyles()
    const {page, setPage} =useContext(MainContext)
    const [modalOpen, setModalOpen] = useState(false)

  return (
    <Grid container item xs={12} className={classes.mainContainer}>
        <Grid container className={classes.headerSection}>
            <Grid container item xs={10} className={classes.header}>
                <img style={{height:'100%'}} src={'https://reviews.comparisons.org/personal-loans/assets/images/5ab78124d0ad7a25153a4db5/5b392d4dd0ad7a4044731f99.png'} alt='logo'/>
                <Button>Log In</Button>
            </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.hero}>

            <Grid contianer item xs={12} className={classes.heroBackground}>
                <div className={classes.heroOverlay}></div>
                <img src={'https://www.signupgenius.com/cms/socialMediaImages/fun-outdoor-activities-families-1260x6301.jpg'} alt='family' className={classes.heroImg}/>
            </Grid>

            <Grid container item xs={10} md={8} style={{position:'absolute', display:'flex', justifyContent:'center', height:'100%', left: 0, right: 0,  marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid container item xs={12}>
                    <div className={classes.heroTextContainer}>
                        <Typography variant='h1' className={classes.heroTitle}>Assisting you with your fiancial needs.</Typography>
                        <Typography variant='h4' className={classes.heroSubTitle}>Personal loans up to $10,000</Typography>
                    </div>
                </Grid>

                <Grid contianer item sm={12} md={10} lg={8} className={classes.formContainer}>
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

        <Grid item contianer xs={12} style={{height:180, marginTop:80, backgroundColor:'#e4dcf3', display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'20px'}}>
            <Typography>Copyright © 2022 PLP Finacial Group. All Rights Reserved</Typography>
            <Typography>Need help? Connect with a branch <span>(888) 555-1212</span> </Typography>
        </Grid>
        <Grid item contianer xs={12} style={{height:80, backgroundColor:'#b69ce0', padding:'0px 20px', display:'flex', alignItems:'center'}}>
            <Typography>Terms | Privacy</Typography>
        </Grid>


        <AppResultsModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>



    </Grid>
  )
}

export default ApplicationForm
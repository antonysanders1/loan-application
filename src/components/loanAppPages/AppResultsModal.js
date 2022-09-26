import React, {useState, useContext} from 'react'
import {Modal, Grid, Typography, Button, FormControlLabel, Checkbox, makeStyles, withStyles, Snackbar} from '@material-ui/core';
import { MainContext } from '../../Context'
import MuiAlert from '@material-ui/lab/Alert';



const GreenCheckbox = withStyles({
    root: {
      color: '#7544c1',
      '&$checked': {
        color: '#7544c1',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', width:300}} />;
  }



function AppResultsModal({modalOpen, setModalOpen}) {
    const {appResults} = useContext(MainContext)
    const [checked, setChecked] = useState(false);
    const [yAlertOpen, setYAlertOpen] = useState(false)
    const [nAlertOpen, setNAlertOpen] = useState(false)

    const handleClose = () => {
        window.location.reload()
    }

    const handleAccept = () => {
        setYAlertOpen(!yAlertOpen)
    }

    const handleDecline = () => {
        setNAlertOpen(!nAlertOpen)
    }


    

  return (
    <Modal open={modalOpen} onClose={()=>setModalOpen(!modalOpen)}>
        <Grid container xs={10} sm={8} md={5} lg={4} style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', backgroundColor: 'white', borderRadius: '15px', padding:20}}>
            
            {appResults !== 'Denied' ?
            <Grid item container xs={12} style={{height:'fit-content', display:'flex', justifyContent:'center'}}>
                <img src="https://img.icons8.com/clouds/100/000000/money.png" alt='money'/>
                <Typography style={{width:'100%', textAlign:'center', fontSize:40, fontWeight:'bold'}}>Congratulations!</Typography>
                <Typography style={{width:'100%', textAlign:'center', fontSize:20, marginBottom:170}}>You have been approved for a {appResults === 'Approved Small' ? '$500' : '$10,000'} loan!</Typography>

                <FormControlLabel
                    control={<GreenCheckbox checked={checked} onChange={()=> setChecked(!checked)} name="checked" />}
                    label="I have read and accepted the Terms of Agreement."
                />
                <Grid item container xs={12} style={{display:'flex', justifyContent:'space-between', marginTop:20}}>
                    <Button style={{ width:'150px', backgroundColor:'#e4dcf3', color:'#7544c1'}} onClick={handleDecline}>DECLINE</Button>
                    <Button disabled={!checked}
                    style={{ width:'150px', backgroundColor: !checked ? '#e4dcf3' : '#7544c1', color:'#ffffff'}} onClick={handleAccept}>ACCEPT</Button>
                </Grid>
            </Grid>
            :
            <Grid item container xs={12} style={{height:'fit-content', display:'flex', justifyContent:'center'}}>
                <img src="https://img.icons8.com/external-bzzricon-flat-bzzricon-studio/120/000000/external-confused-puppy-bzzricon-flat-bzzricon-flat-bzzricon-studio.png" alt='confused'/>
                <Typography style={{width:'100%', textAlign:'center', fontSize:30, fontWeight:'bold'}}>Thanks for applying with us!</Typography>
                <Typography style={{width:'100%', textAlign:'center', fontSize:20}}>Unfortunately we were not able to approve your application at this time.</Typography>
                <Button style={{width:'150px', marginTop:170, backgroundColor:'#7544c1', color:'#ffffff'}} onClick={()=>setModalOpen(!modalOpen)}>CLOSE</Button>

            </Grid>
            }


            <Snackbar open={yAlertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your funds are on the way!<br/>The loan term is {appResults === "Approved Small" ? "5" : "12"} months.
                </Alert>
            </Snackbar>

            <Snackbar open={nAlertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info"> 
                    Sorry to hear that. <br/>We hope to see you in the future.
                </Alert>
            </Snackbar>



        </Grid>
    </Modal>
  )
}

export default AppResultsModal
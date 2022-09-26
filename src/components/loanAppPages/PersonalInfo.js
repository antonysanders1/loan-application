import React, {useState,useContext, useEffect} from 'react'
import { MainContext } from '../../Context'
import {Grid, Typography, ClickAwayListener, InputLabel, Button} from '@material-ui/core';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



function PersonalInfo() {
    const {firstName, lastName, ssn, dob, setFirstName, setLastName, setSsn, setDob, page, setPage, lettersOnly, numsOnly} = useContext(MainContext)
    const [fNameValid, setFNValid] = useState(null);
    const [lNameValid, setLNValid] = useState(null);
    const [validSSN, setValidSSN] = useState(null);
    const [validDOB, setValidDOB] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [ssn1, setSsn1] = useState("");
    const [ssn2, setSsn2] = useState("");
    const [ssn3, setSsn3] = useState("");
    const [isOpen, setIsOpen] = useState(false);
        
    const disabled = (firstName === '' || lastName === '' || ssn === "" || validDOB === null || validDOB === false || validSSN === null || validSSN === false) ? true : false

    const handleDateChange = (e) => {
        setIsOpen(!isOpen);
        setDob(e.toLocaleDateString());
      };

    const handleClickAway = () => {
        setIsOpen(!isOpen);
        dob === '' ? setValidDOB(false): setValidDOB(true);
    }


    const handleDateSelect = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      };


      const handleNext = (e) => {
        e.preventDefault()
        setPage(page+1)

    }

    useEffect(() => {

    if(ssn1.length === 3 && ssn2.length === 2 && ssn3.length === 4){
        setSsn(ssn1+ssn2+ssn3)
    }

    if(ssn !== ""){
       const ssnArray = [...new Set(ssn.split(''))]
       if(ssnArray.length === 1 && ssn.length === 9){
           setValidSSN(false)
       }else{
        setValidSSN(true)
       }
    }

    if(dob !== ''){
        const dateOfBirth = new Date(dob).toLocaleString('en-US', {day: '2-digit',
            month: '2-digit',year: 'numeric'})
    
        const today = new Date().toLocaleString('en-US', {day: '2-digit',
                month: '2-digit',year: 'numeric'})
        
        const dobArray = dateOfBirth.split('/')      
        const todaysDateArray = today.split('/')
        
        if(parseInt(todaysDateArray[2]) - parseInt(dobArray[2]) >= 18 && parseInt(todaysDateArray[2]) - parseInt(dobArray[2]) <= 125){
            if(parseInt(dobArray[0]) >= parseInt(todaysDateArray[0])){
                if(parseInt(dobArray[1]) <= parseInt(todaysDateArray[1])){
                    setValidDOB(true)
                }else{
                    setValidDOB(false)
                }
            }else{
                setValidDOB(true)
            }
        }else if(parseInt(todaysDateArray[2]) - parseInt(dobArray[2]) < 18){
            setValidDOB(false)
        }else{
            setValidDOB(false)
        }
    }
    
    }, [firstName, lastName, ssn1, ssn2, ssn3, ssn, dob, validDOB, validSSN, fNameValid])
    


  return (
    <Grid item container style={{flexDirection:'column'}}>
        <form onSubmit={handleNext} style={{display:'flex', flexDirection:'column', position:'relative', padding:'20px', height:'calc(70vh - 400px)', minHeight:400}}>
            <Typography style={{width:'100%', fontSize:20}}>Personal Info</Typography>
            <div style={{display:'flex', marginTop:30, flexFlow:'row'}}>
                <div style={{display:'flex',flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='firstName'>First Name</InputLabel>
                    <input
                    placeholder='John*'
                    value={firstName}
                    onKeyPress={(e) => lettersOnly(e)}
                    onChange={(e)=>setFirstName(e.target.value)}
                    onBlur={()=>{firstName === '' ? setFNValid(false): setFNValid(true)}} 
                    required
                    autoComplete="off" id='firstName' type='p' maxLength={35}
                    style={{padding:'0px 10px', height:50, fontSize:18, borderRadius:4, border: fNameValid === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: fNameValid === false ? '#ffcfcf' : null}} />

                    {fNameValid === false &&
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>First name is required.</p>
                    }
                </div>

                <div style={{display:'flex', flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                    <input
                    placeholder='Doe*'
                    onKeyPress={(e) => lettersOnly(e)}
                    defaultValue={lastName}
                    onChange={(e)=>setLastName(e.target.value)} 
                    onBlur={()=>{lastName === '' ? setLNValid(false): setLNValid(true)}} 
                    required
                    autoComplete="off" id='lastName' type='p' maxLength={35}  style={{padding:'0px 10px', height:50, fontSize:18, borderRadius:4, border: lNameValid === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: lNameValid === false ? '#ffcfcf' : null}} />

                    {lNameValid === false &&
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>First name is required.</p>
                    }
                </div>


            </div>


            <div style={{display:'flex', flexFlow:'row', marginTop:20}}>
                <div style={{display:'flex', flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='ssn'>Social Security</InputLabel>
                    <div id='ssn' style={{display:'flex', flexFlow:'row', justifyContent:'space-between'}}>
                        <input
                        value={ssn1}
                        onChange={(e)=> {setSsn1(e.target.value)}}
                        onKeyPress={(e) => numsOnly(e)}
                        onBlur={()=>{ssn1 === '' ? setValidSSN(false): setValidSSN(true)}} 
                        placeholder="xxx"
                        required
                        autoFocus={true}
                        autoComplete="off"  type='password' maxLength={3}
                        style={{padding:'0px 10px', height:50, fontSize:18, width:'26%', borderRadius:4, border: validSSN === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: validSSN === false ? '#ffcfcf' : null}} />

                        <input
                        value={ssn2}
                        onKeyPress={(e) => numsOnly(e)}
                        onChange={(e)=> {setSsn2(e.target.value)}}
                        onBlur={()=>{ssn2 === '' ? setValidSSN(false): setValidSSN(true)}} 
                        placeholder="xx"
                        required
                        autoComplete="off"  type='password' maxLength={2} 
                        style={{padding:'0px 10px', height:50, fontSize:18,  width:'26%', borderRadius:4, border: validSSN === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: validSSN === false ? '#ffcfcf' : null}} />

                        <input
                        value={ssn3}
                        onKeyPress={(e) => numsOnly(e)}
                        onChange={(e)=> {setSsn3(e.target.value)}}
                        onBlur={()=>{ssn3 === '' ? setValidSSN(false): setValidSSN(true)}} 
                        placeholder="xxxx"
                        required
                        autoComplete="off"  type='p' maxLength={4} 
                        style={{padding:'0px 10px', height:50, fontSize:18,  width:'30%', borderRadius:4, border: validSSN === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: validSSN === false ? '#ffcfcf' : null}} />
                    </div>

                    {validSSN === false &&
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>Please enter a valid SSN*</p>
                    }
                </div>

                <div style={{display:'flex', flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='dob'>Date Of Birth</InputLabel>
                    <input
                    value={dob}
                    onClick={handleDateSelect}
                    // onBlur={()=>{dob === '' ? setValidDOB(false): setValidDOB(true)}} 
                    required
                    autoComplete="off" type='p' placeholder="Click to select a date*"
                    style={{padding:'0px 10px', height:50, fontSize:18, borderRadius:4, border: validDOB === false ? '2px solid red' :  '2px solid #b69ce0', backgroundColor: validDOB === false ? '#ffcfcf' : null}} />
                    
                    {validDOB === false && 
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>Date Of Birth is requred. You must be at least 18 years of age to apply.*</p>
                    }
                    
                    {isOpen && (
                        <ClickAwayListener onClickAway={handleClickAway}>
                        <div style={{zIndex:1}}>
                            <DatePicker selected={startDate} onChange={handleDateChange} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={125} maxDate={new Date()} inline />
                        </div>
                        </ClickAwayListener>
                    )}
                </div>
            </div>


            <Button 
            disabled={disabled}
            style={{position:'absolute', right:0, bottom:0, width:'180px', height:'40px', borderRadius:4, border:0, backgroundColor:disabled ? '#e4dcf3': '#7544c1', color:"white"}} type='submit'>NEXT</Button>
            




        </form>
    </Grid>
  )
}


export default PersonalInfo
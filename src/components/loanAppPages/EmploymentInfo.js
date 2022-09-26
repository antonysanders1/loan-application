import React, {useContext, useState, useEffect} from 'react'
import { MainContext } from '../../Context'
import {Grid, Typography, Select, MenuItem, InputLabel, Button, Slider, withStyles} from '@material-ui/core';

function EmploymentInfo({modalOpen, setModalOpen}) {
    const {employer, workStatus, salary, setEmployer, setWorkStatus, setSalary, page, setPage, setSsn, numsOnly, setAppResults} = useContext(MainContext)
    const [employerValid, setEmployerValid] = useState(null)
    const [workStatusValid, setWorkStatusValid] = useState(true)
    const [salaryValid, setSalaryValid] = useState(null)
    const disabled = (employer === '' || workStatus === '' || salary === "" || employerValid === null || employerValid === false || workStatusValid === null || workStatusValid === false || salaryValid === null || salaryValid === false) ? true : false


    
    
    const handlePrevious = (e) => {
        e.preventDefault()
        setPage(page-1)
        setSsn("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(parseInt(salary) > 1000){
            switch (workStatus) {
                case 'Self Employeed':
                    if(parseInt(salary) <= 15000){
                        setAppResults('Approved Small')
                    }else{
                        setAppResults('Approved Large') 
                    }
                    break;
                case 'Part-Time':
                    setAppResults('Approved Small')
                    break;
                case 'Full-Time':
                    if(parseInt(salary) <= 15000){
                        setAppResults('Approved Small')
                    }else{
                        setAppResults('Approved Large') 
                    }
                    break;
            
                default:
                    break;
            }
        }else{
            setAppResults('Denied') 
        }

        setModalOpen(!modalOpen)
    }

    const handleChangeStatus = (event) => {
        setWorkStatus(event.target.value);
        if(event.target.value === ''){
        setWorkStatusValid(false)
      }else{
        setWorkStatusValid(true)
      }
    };

    useEffect(() => {
        if(employer!==""){
            setEmployerValid(true)
        }
        if(salary!==""){
            setSalaryValid(true)
        }
    }, [employer, salary, workStatus, workStatusValid, employerValid, salaryValid])
    

  return (
    <Grid item container style={{flexDirection:'column'}}>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', position:'relative', padding:'20px', height:'calc(70vh - 400px)', minHeight:400}}>
            <Typography style={{width:'100%', fontSize:20}}>Employment Info</Typography>

            <div style={{display:'flex', marginTop:30, flexFlow:'row'}}>
                <div style={{display:'flex',flexFlow:'column', width:'100%', padding:5}}>
                    <InputLabel htmlFor='employer'>Employer</InputLabel>
                    <input
                    placeholder='i.e. Amazon*'
                    value={employer}
                    onChange={(e)=>setEmployer(e.target.value)}
                    onBlur={()=>{employer === '' ? setEmployerValid(false): setEmployerValid(true)}} 
                    required
                    autoComplete="off" id='employer' type='p' maxLength={35}  style={{padding:'0px 10px', height:50, fontSize:18, borderRadius:4, border: employerValid === false ? '2px solid red' : '2px solid #b69ce0', backgroundColor: employerValid === false ? '#ffcfcf' : null}} />
                    
                    {employerValid === false &&
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>Employer Name name is required.</p>
                    }

                </div>

               


            </div>


            <div style={{display:'flex', flexFlow:'row', marginTop:20}}>
                <div style={{display:'flex', flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='lastName'>Work Status</InputLabel>
                       <Select
                        variant='standard'
                        id="workstatus"
                        value={workStatus}
                        onChange={handleChangeStatus}
                        onBlur={()=>{workStatus === '' ? setWorkStatus(false): setWorkStatus(true)}} 
                        style={{padding:'0px 10px', fontSize:18, height:54, borderRadius:4, border: workStatusValid === false ? '2px solid red' : '2px solid #b69ce0', backgroundColor: workStatusValid === false ? '#ffcfcf' : null}}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Part-Time'}>Part-Time</MenuItem>
                        <MenuItem value={'Full-Time'}>Full-Time</MenuItem>
                        <MenuItem value={'Self Employeed'}>Self-Employed</MenuItem>
                        </Select>
                        {workStatusValid === false &&
                        <p style={{marginTop:0, fontSize:12, color:'red'}}>Work status is required.</p>
                        }

                </div>

                <div style={{display:'flex', flexFlow:'column', width:'50%', padding:5}}>
                    <InputLabel htmlFor='workstatus'>Annual Gross Income</InputLabel>
                    <input
                    placeholder='i.e. 35000*'
                    value={salary}
                    onKeyPress={(e) => numsOnly(e)}
                    onChange={(e)=>setSalary(e.target.value)}
                    onBlur={()=>{salary === '' ? setSalaryValid(false): setSalaryValid(true)}} 
                    required
                    autoComplete="off" id='salary' type='p' maxLength={35}  style={{padding:'0px 10px', height:50, fontSize:18, borderRadius:4, border: salaryValid === false ? '2px solid red' : '2px solid #b69ce0', backgroundColor: salaryValid === false ? '#ffcfcf' : null}} />
                    
                    {salaryValid === false &&
                    <p style={{marginTop:0, fontSize:12, color:'red'}}>Income is required.</p>
                    }
                </div>


                    
            </div>


            <div style={{position:'absolute', left:0, right:0, bottom:0, width:'100%', display:'flex', justifyContent:'space-between' }}>

            <Button onClick={handlePrevious}
            style={{width:'180px', height:'40px', borderRadius:4, border:0, backgroundColor:'#e4dcf3', color:"#7544c1"}}>BACK</Button>
            
            <Button disabled={disabled}
            style={{width:'180px', height:'40px', borderRadius:4, border:0, backgroundColor:disabled ? '#e4dcf3': '#7544c1', color:"white"}} type='submit'>APPLY</Button>
            </div>
            




        </form>

    </Grid>
  )
}

export default EmploymentInfo
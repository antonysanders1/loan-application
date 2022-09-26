import React, {createContext, useState} from 'react';

export const MainContext = createContext();

export const MainProvider = ({children}) => {
    const [page, setPage] = useState(1)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ssn, setSsn] = useState("")
    const [dob, setDob] = useState('')

    const [employer, setEmployer] = useState("")
    const [workStatus, setWorkStatus] = useState("")
    const [salary, setSalary] = useState("")

    const [appResults, setAppResults] = useState("") //Values accepted "Approved Large", "Approved Small", "Denied"


    const lettersOnly = (e) => {
        const re = /[A-Za-z-' ]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }

      const numsOnly = (e) => {
        const re = /[0-9]+/g;
          if (!re.test(e.key)) {
            e.preventDefault();
          }
        }


    
    return (
        <MainContext.Provider value={{
            page, firstName, lastName, ssn, dob, employer, workStatus, salary, appResults,
            setPage, setFirstName, setLastName, setSsn, setDob, setEmployer, setWorkStatus, setSalary,
            lettersOnly, numsOnly, setAppResults
        }}>
            {children}
        </MainContext.Provider>
    )
    
}
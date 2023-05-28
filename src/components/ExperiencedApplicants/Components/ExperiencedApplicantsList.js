import {React , useCallback, useState} from 'react' 
import { Table, TableHead, TableCell, Divider, TableBody, Button } from '@mui/material'
import { ExperiencedApplicantDetails } from './ExperiencedApplicantDetails';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


export const ExperiencedApplicantsList = ({expApplicantList}) => {
  const [expAppList, setExpAppList]= useState(expApplicantList)
  const [details, setDetails]= useState({})
  const [expAppDetailMode, setExpAppDetailMode] = useState(false)

  const viewExperiencedApplicant = useCallback((id)=>{
    const applicantDetails = (expAppList.filter((data)=>data.id===id))    
    setExpAppDetailMode(true)
    setDetails(applicantDetails)
    },[details])
    console.log(details,'aaaaa')
    function detailOpen(){
      setExpAppDetailMode(true)
    }
    function detailClose(){
      setExpAppDetailMode(false)
    }
  return (<>
      <TableContainer sx={{marginTop:1}} component={Paper}>
      <h1 style={{textAlign:'center'}}>Applicants with Experiences</h1> 
      </TableContainer>

      {expAppDetailMode&&
      <TableContainer sx={{marginTop:1}} component={Paper}>
      <ExperiencedApplicantDetails onClick={detailClose} details={details}/>
      </TableContainer>}
    {!expAppDetailMode &&

    <TableContainer sx={{marginTop:2}} component={Paper}>
    <Table style={{left:0, right:0}}>
    <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>Worked Company Name</TableCell>
      <TableCell>Action</TableCell>
    </TableHead>
    {expAppList.map((list)=>{
    return(
    <TableBody>
      <TableCell>{list.fullName}</TableCell>
      <TableCell>{list.experiences?.map((exp)=>{
        return(<>{exp.companyName}<br/></>)
      })}
      </TableCell>
      <TableCell>
         <Button onClick={()=>viewExperiencedApplicant(list.id)} variant='outlined' color='primary' startIcon={<VisibilityIcon/>}>view</Button>
      </TableCell>
    </TableBody>
    )  
  })}
   </Table>
    </TableContainer>
   }
    </>
    )
}

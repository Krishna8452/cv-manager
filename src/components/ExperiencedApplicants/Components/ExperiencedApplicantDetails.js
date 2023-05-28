import React from 'react'
import { Table, TableCell, TableHead ,IconButton, Divider} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export const ExperiencedApplicantDetails = ({details,onClick}) => {
  const detailObject= details[0]
  console.log(detailObject,  'object')
  return (<>
    <div style={{ display: 'flex',color:'red', border:'2px', justifyContent:'right'}}>
    <IconButton onClick={onClick}  sx={{right:0}} title='Cancel'>
        <CancelIcon/>
    </IconButton>
  </div>
  <TableContainer sx={{marginTop:1}} component={Paper}>
    <Table>
     <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>{detailObject.fullName}</TableCell>
     </TableHead>
     <TableHead>
      <TableCell>Email</TableCell>
      <TableCell>{detailObject.email}</TableCell>
     </TableHead>
     <TableHead>

     <TableCell>Experience</TableCell>

<TableCell>{detailObject.experiences?.map((exp)=>{
  return(<>
  <ul>
    <li>Company Name:  {exp.companyName}</li>
    <li>Start date: {exp.startedDate}</li>
    <li>End date: {exp.endDate}</li>
    <li>position: {exp.position}</li>
    <li>Responsibilities: {exp.responsibilities}</li>
  </ul>
  <Divider/>
  </>)
})}</TableCell>
     </TableHead>
     <TableHead>
      <TableCell>Level</TableCell>
      <TableCell>{detailObject.level}</TableCell>
     </TableHead>
     <TableHead>
      <TableCell>Phone Number</TableCell>
      <TableCell>{detailObject.phoneNumber}</TableCell>
     </TableHead>
     <TableHead>
      <TableCell>Expected Salary</TableCell>
      <TableCell>{detailObject.expectedSalary}</TableCell>
     </TableHead>
    </Table>
  </TableContainer>
    </>
  )
}

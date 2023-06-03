import {React} from 'react'
import {Table, TableCell, TableHead ,IconButton, Box, Divider} from '@mui/material'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export default function InterviewerDetail({details}){
  const detail= details[0]
  const steps = ['shortlisted', 'first interview', 'second interview', 'pending', 'hired'];
  console.log(details,'hr')
  return(<>
  <TableContainer sx={{marginTop:1, gap:10 ,Padding:'1rem'}} component={Paper}>

  <Divider/>  
  <Table padding='1rem'>
    <TableHead>
      <TableCell> ID</TableCell>
      <TableCell>{detail.id}</TableCell>
    </TableHead>
    <TableHead>
      <TableCell>Interviewer Name</TableCell>
      <TableCell>{detail.interviewerName}</TableCell>
    </TableHead>
    <TableHead>
      <TableCell> Email</TableCell>
      <TableCell>{detail.email}</TableCell>
    </TableHead>
    <TableHead>
      <TableCell>Position</TableCell>
      <TableCell>{detail.position}</TableCell>
    </TableHead>
  </Table>
  </TableContainer>
  </>)
}

import {React} from 'react'
import {Table, TableCell, TableHead ,IconButton, Box, Divider, Typography} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'
import { Padding } from '@mui/icons-material';

export const InterviewerDetail = ({details, onClick}) =>{
  const detail= details[0]
  const steps = ['shortlisted', 'first interview', 'second interview', 'pending', 'hired'];
  console.log(details,'hr')
  return(<>
  <TableContainer sx={{marginTop:1, gap:10 ,Padding:'1rem'}} component={Paper}>
    <Box display={'flex'}>
        <Box sx={{flexGrow:1}}/>
      <Box style={{ color:'red',  border:'2px', justifyContent:'center', alignItem:'center', gap:'3rem'}}>  
        <Link to={`/experience/edit/${detail.id}`}>
          <IconButton title="edit">
            <EditIcon  color="primary"/>
          </IconButton>
        </Link>
      </Box>
      <Box style={{ marginLeft:'1rem',display: 'flex',color:'red', border:'2px', justifyContent:'right  '}}>
        <IconButton onClick={onClick}   title='Cancel'>
            <CancelIcon/>
        </IconButton>
      </Box>
    </Box>

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

import {React, useState, useEffect, useCallback} from 'react'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {Button,ButtonGroup, Box,Icon,IconButton, TableHead, TableBody, TableCell,Table} from '@mui/material'
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import axios from 'axios'

export default function AssessmentTestList(){
  const navigate= useNavigate()
  const [ list , setList] = useState([])
  const [open , setOpen] = useState(false)
  const [storeId , setStoreId] = useState()



  useEffect(()=>{
      fetchData()
  },[])
  const fetchData = async()=>{
    const response =  await fetch("http://localhost:3031/assessmentTest")
    const data = await response.json()
    setList(data)
  }
  const handleClickOpen = useCallback(
    (id) => {
      setStoreId(id);
      setOpen(true);
    },
    [open]
  );
  const handleClose = () => {
    setOpen(false);
  };
  function deleteAssessmentTest(id) {
    console.log(id,'hello')
    axios.delete(`http://localhost:3031/assessmentTest/${id}`)
    setList((list) =>
    list.filter((list) => list.id !== id)
  );
    setOpen(false);
  }

  return (
    <>
    <TableContainer sx={{display:'flex', marginTop:1}} component={Paper}>
    <IconButton onClick={()=>navigate('/dashboard')}>
          <ArrowBackIcon/>
    </IconButton>
    <h1 style={{marginLeft:'37%'}}>Assessment Test List</h1>
    <Box sx={{flexGrow:1}}/>  
    <Box sx={{marginLeft:"15px", display:'flex'}}>         
        <IconButton onClick={()=>navigate('/assessmentTest/create')}>
          <Icon sx={{ color: green[500], textAlign: 'right'}} fontSize='large'>add_circle</Icon>
        </IconButton>
    </Box>
    </TableContainer>
    <TableContainer sx={{display:'flex', marginTop:1, marginRight:"1rem"}} component={Paper}>
      <Table>
      <TableHead>
        <TableCell>Title</TableCell>
        <TableCell>Applicant Name</TableCell>
        <TableCell>Evaluation</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      {list.map((list)=>{
        return<>
      <TableBody> 
        <TableCell>{list.title}</TableCell>
        <TableCell>{list.applicant}</TableCell>
        <TableCell>{list.evaluation}</TableCell>
        <TableCell>
        <ButtonGroup>
                <Button
                  //onClick={() => viewInterviewer(list.id)}
                  variant="outlined"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                >
                  view
                </Button>

                <Button
                   onClick={()=>navigate(`/assessmentTest/edit/${list.id}`)}
                   color="primary" 
                   startIcon={<EditIcon/>}>
                   edit
                </Button>

                <Button
                  onClick={() => handleClickOpen(list.id)}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </ButtonGroup>
        </TableCell>    
      </TableBody>
      </>
         })}
      </Table>
      <Dialog
          sx={{ justifyContent: "center" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            Are you sure you want to delete the Interview ?
          </DialogTitle>
          <DialogContent>Your data will be lost Permanently.</DialogContent>
          <IconButton size="large" variant="contained" color="error">
            <DeleteIcon/>
          </IconButton>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Box sx={{ flexGrow: 1 }}/>
            <Button variant="contained" color="error" onClick={() => deleteAssessmentTest(storeId)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </TableContainer>
    </>
  )
}

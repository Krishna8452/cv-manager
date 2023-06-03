import {React, useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormComponent from './FormComponent';
import {Typography,Divider,Box, Dialog, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from "@mui/icons-material/Cancel"


const InterviewerForm = () => {
  const {id} =useParams()
  const navigate =useNavigate()
  const [editMode ,setEditMode] =useState(false)
  const [oldData, setOldData] = useState(null)
  const [open, setOpen]= useState(true)
  const initialValues ={
    interviewerName:(editMode? `${oldData.interviewerName}` :''),
    email:(editMode? `${oldData.email}` :''),
    position:(editMode? `${oldData.position}` :'')
  };
  useEffect(()=>{
   const fetchData = async () =>{   
    try{
      const response= await axios.get(`http://localhost:3031/interviewers/${id}`)
      const data = response.data
      setOldData(data);
      setEditMode(true)  
    }catch (error) {
      console.log('Error fetching data:', error);
    }
  };
      if(id){
        fetchData()
      }
   },
  [id])
  const handleSubmit = (values, { setSubmitting }) => {
    caches.log('jell')
      //localStorage.setItem('applicantList', JSON.stringify([values]))   
      if(id){
        console.log(values,'yes')
        axios.put(`http://localhost:3031/interviewers/${id}`,values)
        navigate('/interviewer')
     
      }else{
          axios.post('http://localhost:3031/interviewers',values)
          navigate('/interviewer')
      }    
  };
  console.log(initialValues,'me')
  return (
    <div>
      <TableContainer sx={{display:'flex', marginTop:1 }} component={Paper}>
      <IconButton onClick={()=>navigate('/interviewer')}>
        <ArrowBackIcon/>
      </IconButton>
      <h1 style={{ textAlign: "center", marginLeft:'34%'}}> {editMode ? 'Update a Interviewer form':'Create a Interviewer form'} </h1>
      </TableContainer>
      <Dialog 
      open={open}
      >
      <Box sx={{display:'flex'}}>
        <Typography sx={{fontSize:40, marginTop:2, marginLeft:'7rem'}}>Fill the Form</Typography>
        <Box sx={{flexGrow:1}}/>
        <IconButton color={"red"} onClick={()=>navigate('/interviewer')} title="Cancel">
          <CancelIcon />
        </IconButton>
      </Box>
      <Divider/>
        <FormComponent onSubmit={handleSubmit} initialValues={initialValues}/>
     </Dialog>
    </div>
  );
};
export default InterviewerForm;


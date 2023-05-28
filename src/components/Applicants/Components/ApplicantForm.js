import {React, useEffect, useState} from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormComponent from './FormComponent';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ApplicantForm = () => {
  const {id} =useParams()
  const navigate =useNavigate()
  const [editMode ,setEditMode] =useState(false)
  const [oldData, setOldData] = useState(null) 
   
  const initialValues= {
    firstName:(editMode? `${oldData.firstName}`:""),
    middleName:(editMode? `${oldData.middleName}`:''),
    lastName: (editMode? `${oldData.lastName}`:''),
    email:(editMode? `${oldData.email}`:''),
    phoneNumber:(editMode? `${oldData.phoneNumber}`: null),
    level:(editMode? `${oldData.level}`: ''),
    reference:(editMode? `${oldData.reference}`:''),
    technology:[],
    experience:(editMode? `${oldData.experience}`:''),
    status:(editMode? `${oldData.status}`:''),
    salary_expectation:(editMode? `${oldData.salary_expectation}`:""),
    file:null
  };

  useEffect(()=>{
   const fetchData = async () =>{   
    try{
      const response= await axios.get(`http://localhost:3031/applicants/${id}`)
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
      //localStorage.setItem('applicantList', JSON.stringify([values]))   
      if(id){
        axios.put(`http://localhost:3031/applicants/${id}`,values)
        navigate('/applicant')
     
      }else{
        axios.post('http://localhost:3031/applicants',values)
        navigate('/applicant')
      }    
  };
  console.log(oldData,'me')
  return (
    <div>
      <TableContainer sx={{display:'flex', marginTop:1 }} component={Paper}>
      <IconButton onClick={()=>navigate('/applicant')}>
        <ArrowBackIcon/>
      </IconButton>
      <h1 style={{marginLeft:'34%'}}> {editMode ? 'Update a Applicant form':'Create a Applicant form'} </h1>
      </TableContainer>
        <FormComponent onSubmit={handleSubmit} initialValues={initialValues}/>
     
    </div>
  );
};
export default ApplicantForm;


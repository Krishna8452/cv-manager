import React, { useEffect, useState } from "react";
import axios from "axios";
import FormComponent from './FormComponent'
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { IconButton} from "@mui/material";

const InterviewForm = () => {
  const {id}=useParams()
  const navigate= useNavigate()
  const [interviewers, setInterviewers] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [oldData, setOldData] = useState(null)
  const initialValues={
    interviewers:(editMode? [`${oldData.interviewers}`] : []),
    applicant:(editMode? `${oldData.applicant}` : ""),
    date:(editMode? `${oldData.date}` :null),
    time:(editMode? `${oldData.time}` :"")
  }

  useEffect(() => {
    if(id){
      fetchData()
    }
    axios.get("http://localhost:3031/interviewers")
      .then((response) => {
        setInterviewers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching interviewers:", error);
      });

    axios.get("http://localhost:3031/applicants")
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
      });

  }, []);
  const fetchData = async () =>{   
    try{
      const response= await axios.get(`http://localhost:3031/interviews/${id}`)
      const data = response.data
      setOldData(data);
      setEditMode(true)  
    }catch (error) {
      console.log('Error fetching data:', error);
    }
  };


  const handleSubmit = async (values) => {

    try {
      if (id) {
        console.log(values, "yes");
        axios.put(`http://localhost:3031/interviews/${id}`, values);
        navigate("/interview");

      } else {
  
        axios.post('http://localhost:3031/interviews',values)
        navigate('/interview')
      }
       
    } catch (error) {
      console.error("Error:", error);
    }
  };
   console.log(oldData,"y")
  return (
    <>
      <TableContainer sx={{ display: "flex", marginTop: 1 }} component={Paper}>
        <IconButton onClick={()=>navigate('/dashboard')}>
            <ArrowBackIcon/>
        </IconButton>
        <h1 style={{ marginLeft: "34%" }}> Offer Letter List</h1>
    </TableContainer>
     <FormComponent initialValues={initialValues} onSubmit={handleSubmit} applicants={applicants} interviewers={interviewers}/>
    </>
  );
};
export default InterviewForm;

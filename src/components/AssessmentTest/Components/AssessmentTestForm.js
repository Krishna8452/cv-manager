import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IconButton, Dialog, Typography, Box, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AssessmentTestFormComponent from "./AssessmentTestFormComponent";
import CancelIcon from "@mui/icons-material/Cancel";


export default function AssessmentTestForm() {
  const navigate = useNavigate();
  const{id}=useParams()
  const [applicants, setApplicants] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(true)

  const initialValues = {
    applicant: "",
    title: "",
    evaluation: "",
    document: "",
  };
  useEffect(() => {
    fetchData();
    fetchOldData();
  }, []);
  const fetchOldData = async () =>{   
    try{
      const response= await axios.get(`http://localhost:3031/assessmentTest/${id}`)
      const data = response.data
      setOldData(data);
      setEditMode(true)  
    }catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const fetchData = () => {
    axios
      .get("http://localhost:3031/applicants")
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching interviewers:", error);
      });
  };
  const handleSubmit = (values, { setSubmitting }) => {
    //localStorage.setItem('applicantList', JSON.stringify([values]))
     if(id){
       axios.put(`http://localhost:3031/assessmentTest/${id}`,values)
       navigate('/assessmentTest')

     }else{

    axios.post("http://localhost:3031/assessmentTest", values);
    navigate("/assessmentTest");
     }
  };
  console.log(oldData, "kkk");

  return (
    <>     
      <Dialog open={open}>
      <Box sx={{display:'flex'}}>
        <Typography sx={{fontSize:40, marginTop:2, marginLeft:'5rem'}}>Fill the Form</Typography>
        <Box sx={{flexGrow:1}}/>
        <IconButton color={"red"} onClick={()=>navigate('/assessmentTest')} title="Cancel">
          <CancelIcon />
        </IconButton>
      </Box>
      <Divider/>
      <AssessmentTestFormComponent
        initialValues={initialValues}
        applicants={applicants}
        onSubmit={handleSubmit}
      /></Dialog>
    </>
  );
}

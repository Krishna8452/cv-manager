import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AssessmentTestFormComponent from "./AssessmentTestFormComponent";
export default function AssessmentTestForm() {
  const navigate = useNavigate();
  const{id}=useParams()
  const [applicants, setApplicants] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [editMode, setEditMode] = useState(false)

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
      <TableContainer
        sx={{ display: "flex", marginTop: 1, marginBottom: 2 }}
        component={Paper}
      >
        <IconButton onClick={() => navigate("/assessmentTest")}>
          <ArrowBackIcon />
        </IconButton>
        <h1 style={{ marginLeft: "37%" }}> Fill up the Form. </h1>
      </TableContainer>
      <AssessmentTestFormComponent
        initialValues={initialValues}
        applicants={applicants}
        onSubmit={handleSubmit}
      />
    </>
  );
}

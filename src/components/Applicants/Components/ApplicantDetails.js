import { React, useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const ApplicantDetails = ({ details, onClick }) => {
  const detail = details[0];

  const steps = [
    "shortlisted",
    "first_interview",
    "second_interview",
    "pending",
    "hired",
  ];
const [offerLettersList, setOfferlettersList] = useState([])
useEffect(() => {
  fetchData();
},[]);

const fetchData = async () => {
  try {
    const response =fetch("http://localhost:3031/offerLetters");
    const data = await response.json();
    setOfferlettersList(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
function fetch(id) {
  const applicantOfferLetter = offerLettersList.filter((data) => data.id === id);
  setOfferlettersList(applicantOfferLetter)
}
  console.log(offerLettersList, "hr");
  return (
    <>
      <TableContainer component={Paper}>
      <Box sx={{ marginBottom: 1 }}>
          <Stepper activeStep={steps.indexOf(detail.status)} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box display={"flex"}>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            style={{
              color: "red",
              border: "2px",
              justifyContent: "center",
              alignItem: "center",
              gap: "3rem",
            }}
          >
            <Link to={`/applicant/edit/${detail.id}`}>
              <IconButton title="edit">
                <EditIcon color="primary" />
              </IconButton>
            </Link>
          </Box>
          <Box
            style={{
              display: "flex",
              color: "red",
              border: "2px",
              justifyContent: "right  ",
            }}
          >
            <IconButton onClick={onClick} title="Cancel">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      </TableContainer>

        <Divider />
      <Box sx={{ display:"flex"}}>
        <TableContainer sx={{marginLeft:2, height:300, marginTop:3, width:'30%'}} component={Paper}>
        <Box  sx={{ marginLeft:2, textAlign:'center'}}>
          <h1>Personal Information</h1>
          <Typography>Appliant ID:  {detail.id}</Typography>
          <Typography>Full Name:  {detail.firstName} {detail.lastName}</Typography>
          <Typography>Email: {detail.email}</Typography>
          <Typography>Phone Number: {detail.phoneNumber}</Typography>
          <Typography>Reference: {detail.reference}</Typography>
        </Box>
      </TableContainer>
      <TableContainer sx={{marginLeft:2, height:300, marginTop:3, width:'30%'}} component={Paper}>
        <Box  sx={{ marginLeft:2, textAlign:'center'}}>
          <h1>Technical Information</h1>
          <Typography>Position:  {detail.level}</Typography>
          <Typography> Technology:  {detail.technology?.map((list) => {
                return <>{list}, </>;
              })}</Typography>
          <Typography>Expected Salary: {detail.salary_expectation}</Typography>
          <Typography>Resume: {detail.resume}</Typography>
        </Box>
      </TableContainer>
      <TableContainer sx={{marginLeft:2, height:300, marginTop:3, width:'30%'}} component={Paper}>
        <Box  sx={{ marginLeft:2, textAlign:'center'}}>
          <h1>Offer Letter</h1>
          <Typography>Position:  {detail.level}</Typography>
          <Typography> Technology:  {detail.technology?.map((list) => {
                return <>{list}, </>;
              })}</Typography>
          <Typography>Expected Salary: {detail.salary_expectation}</Typography>
          <Typography>Resume: {detail.resume}</Typography>
        </Box>
      </TableContainer>
      </Box>  
    </>
  );
};

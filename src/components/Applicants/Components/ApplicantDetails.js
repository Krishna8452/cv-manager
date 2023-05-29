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
  const [offerLettersList, setOfferlettersList] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3031/offerLetters/${detail.id}`);
      const data = await response.json();
      setOfferlettersList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  console.log(offerLettersList, "hrr");
  return (
    <>
      <TableContainer sx={{ display: "flex", paddingTop: 2, paddingBottom:2, }} component={Paper}>
        <Box sx={{ marginBottom: 1, width: "90%" }}>
          <Stepper activeStep={steps.indexOf(detail.status)} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "right",
            alignContent: "right",
            gap:'1.5rem'
          }}
        >
          <Box
            style={{
              color: "red",
              border: "2px",
              justifyContent: "center",
              alignItem: "center",
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
              border: "2px",
              justifyContent: "right",
            }}
          >
            <IconButton color={"red"} onClick={onClick} title="Cancel">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      </TableContainer>

      <Divider />
      <Box sx={{ display: "flex" }}>

        <TableContainer
          sx={{ marginLeft: 2, height: 300, marginTop: 3, width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <h2>Personal Information</h2>
            <Typography>Appliant ID: {detail.id}</Typography>
            <Typography>
              Full Name: {detail.firstName} {detail.lastName}
            </Typography>
            <Typography>Email: {detail.email}</Typography>
            <Typography>Phone Number: {detail.phoneNumber}</Typography>
            <Typography>Reference: {detail.reference}</Typography>
          </Box>
        </TableContainer>

        <TableContainer
          sx={{ marginLeft: 2, height: 300, marginTop: 3, width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <h2>Technical Information</h2>
            <Typography>Position: {detail.level}</Typography>
            <Typography>             
              Technology:{""}
              {detail.technology?.map((list) => {
                return <> {list}, </>;
              })}
            </Typography>
            <Typography>
              Expected Salary: {detail.salary_expectation}
            </Typography>
            <Typography>Resume: {detail.resume}</Typography>
          </Box>
        </TableContainer>
      
        { offerLettersList && 
        <TableContainer
            sx={{ marginLeft: 2, height: 300, marginTop: 3, width: "30%" }}
            component={Paper}
          >
            <Box sx={{ marginLeft: 2, textAlign: "center" }}>
              <h1>Offer Letter</h1>
              <Typography>editor: {offerLettersList.editor}</Typography>
              <Typography>
                Status: {offerLettersList.status}
              </Typography>
              <Typography>Letter File: {offerLettersList.letterFile}</Typography>
            </Box>
        </TableContainer>}
      </Box>
    </>
  );
};

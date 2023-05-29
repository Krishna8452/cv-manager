import { React, useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Box,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const ApplicantDetails = ({ details, onClick }) => {
  const detail = details[0];

  const steps = [
    "shortListed",
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
      const response = await fetch(
        `http://localhost:3031/offerLetters/${detail.id}`
      );
      if (response.status !== 404) {
        const data = await response.json();
        setOfferlettersList(data);
      } else {
        setOfferlettersList(null);
      }
      debugger;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  console.log(offerLettersList, "hrr");
  return (
    <>
      <TableContainer
        sx={{ display: "flex", paddingTop:1, paddingBottom:1 }}
        component={Paper}
      >
        <Box sx={{ marginBottom: 1, width: "105%",marginTop:1 }}>
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
            gap: "1.5rem",
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
      <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center', marginTop:1}}>
        <TableContainer
          sx={{ height: 275, width: "33%" }}
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
          sx={{ marginLeft: 2, height: 275,  width: "33%" }}
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

        <TableContainer
          sx={{ marginLeft: 2, height: 275, width: "33%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <Box sx={{display:'flex'}}>
              <h2 style={{marginLeft:'9rem'}}>Offer Letter</h2>
              <Box sx={{flexGrow:1}}/>
              {offerLettersList && <Button
                sx={{marginTop:'0.5rem', height:"1.5rem", marginRight:"1rem"}}
                color="success"
                size="small"
                variant="outlined"
                component={Link}
                to={`/offerLetter/edit/${offerLettersList.id}`}
              >
                edit
              </Button>}
            </Box>
            {offerLettersList ? (
              <>
                <Typography>editor: {offerLettersList.editor}</Typography>
                <Typography>Status: {offerLettersList.status}</Typography>
                <Typography>
                  Letter File: {offerLettersList.letterFile}
                </Typography>
              </>
            ) : (
              <Typography>
                No offer letter created, Click below button if you want to
                create.
                <br />
                <br />
                <Button
                  color="success"
                  size="small"
                  variant="outlined"
                  component={Link}
                  to="/offerLetter/create"
                >
                  Create
                </Button>
              </Typography>
            )}
          </Box>
        </TableContainer>
      </Box>
    </>
  );
};

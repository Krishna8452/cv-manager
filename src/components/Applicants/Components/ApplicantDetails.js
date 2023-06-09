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
  const [applicant,setApplicant] = useState(detail)
  const [offerLetter, setOfferLetter] = useState(null);
  const [interview, setInterview] = useState(null);
  const [assessmentTest, setAssessmentTest] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await fetch(
      `http://localhost:3031/offerLetters`
    );
    if(response.status !== 404) {
      const data = await response.json();
      const applicantOffer = data.filter((data)=>data.applicant===detail.id)
      console.log(applicantOffer,'appoffer')
      setOfferLetter(applicantOffer[0]);
    } else {
      setOfferLetter(null);
    }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try{
      const response = await fetch(
      `http://localhost:3031/interviews`
    );
    if(response.status !== 404) {
      const data2 = await response.json();
      const interviewData = data2.filter((data)=>data.applicant===detail.id)
      setInterview(interviewData[0]);
    } else {
      setInterview(null);
    }
    } catch (error) {
    console.log("Error fetching data:", error);
    }
    try{
      const response = await fetch(
      `http://localhost:3031/assessmentTest`
    );
    if(response.status !== 404) {
      const data3 = await response.json();
      const assessmentData = data3.filter((data)=>data.applicant===detail.id)
      setAssessmentTest(assessmentData[0]);
    } else {
      setInterview(null);
    }
    } catch (error) {
    console.log("Error fetching data:", error);
    }
  };
  console.log(assessmentTest, "hrr");

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
      <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center', marginTop:2, marginBottom:4,gap:4}}>
        <TableContainer
          sx={{marginLeft: 2, height: 275, width: "30%" }}
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
          sx={{ marginLeft: 2, height: 275,  width: "30%" }}
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
          sx={{ marginLeft: 2, height: 275, width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <Box sx={{display:'flex'}}>
              <h2 style={{marginLeft:'8rem'}}>Offer Letter</h2>
              <Box sx={{flexGrow:1}}/>
              {offerLetter && <Button
                sx={{marginTop:'0.5rem', height:"1.5rem", marginRight:"1rem"}}
                color="success"
                size="small"
                variant="outlined"
                component={Link}
                to={`/offerLetter/edit/${offerLetter.id}`}
              >
                edit
              </Button>}
            </Box>
            {offerLetter ? (
              <>
                <Typography>editor: {offerLetter.editor}</Typography>
                <Typography>Status: {offerLetter.status}</Typography>
                <Typography>
                  Letter File: {offerLetter.letterFile}
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
      <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center', marginTop:2, marginBottom:4,gap:4}}>
      <TableContainer
          sx={{marginLeft: 2, height: 275,  width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <Box sx={{display:'flex'}}>
              <h2 style={{marginLeft:'8rem'}}> Interview</h2>
              <Box sx={{flexGrow:1}}/>
              {interview && <Button
                sx={{marginTop:'0.5rem', height:"1.5rem", marginRight:"1rem"}}
                color="success"
                size="small"
                variant="outlined"
                component={Link}
                to={`/interview/edit/${interview.id}`}
              >
                edit
              </Button>}
            </Box>
            {interview ? (
              <>
                <Typography>Interviewers: {interview.interviewers?.map((list)=>{return<>{list}</>})}</Typography>
                <Typography>Date: {interview.date}</Typography>
                <Typography>
                  Time : {interview.time}
                </Typography>
              </>
            ) : (
              <Typography>
                No Interview created, Click below button, if you want to
                create.
                <br />
                <br />
                <Button
                  color="success"
                  size="small"
                  variant="outlined"
                  component={Link}
                  to="/interview/create"
                >
                  Create
                </Button>
              </Typography>
            )}
          </Box>
          
        </TableContainer>
        <TableContainer
          sx={{marginLeft: 2, height: 275,  width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <Box sx={{display:'flex'}}>
              <h2 style={{marginLeft:'7rem'}}> Assessment Test</h2>
              <Box sx={{flexGrow:1}}/>
              {assessmentTest && <Button
                sx={{marginTop:'0.5rem', height:"1.5rem", }}
                color="success"
                size="small"
                variant="outlined"
                component={Link}
                to={`/assessmentTest/edit/${interview.id}`}
              >
                edit
              </Button>}
            </Box>
            {assessmentTest ? (
              <>
                <Typography>Title: {assessmentTest.title}</Typography>
                <Typography>Evaluation: {assessmentTest.evaluation}</Typography>
                <Typography>Time : {assessmentTest.document}</Typography>
              </>
            ) : (
              <Typography>
                No Assessment Test created, Click below button, if you want to
                create.
                <br />
                <br />
                <Button
                  color="success"
                  size="small"
                  variant="outlined"
                  component={Link}
                  to="/assessmentTest/create"
                >
                  Create
                </Button>
              </Typography>
            )}
          </Box>
          
        </TableContainer>
        <TableContainer
          sx={{marginLeft: 2, height: 275,  width: "30%" }}
          component={Paper}
        >
          <Box sx={{ marginLeft: 2, textAlign: "center" }}>
            <Box sx={{display:'flex'}}>
              <h2 style={{marginLeft:'8rem'}}> Interview</h2>
              <Box sx={{flexGrow:1}}/>
              {interview && <Button
                sx={{marginTop:'0.5rem', height:"1.5rem", marginRight:"1rem"}}
                color="success"
                size="small"
                variant="outlined"
                component={Link}
                to={`/interview/edit/${interview.id}`}
              >
                edit
              </Button>}
            </Box>
            {interview ? (
              <>
                <Typography>Interviewers: {interview.interviewers?.map((list)=>{return<>{list}</>})}</Typography>
                <Typography>Date: {interview.date}</Typography>
                <Typography>
                  Time : {interview.time}
                </Typography>
              </>
            ) : (
              <Typography>
                No Interview created, Click below button, if you want to
                create.
                <br />
                <br />
                <Button
                  color="success"
                  size="small"
                  variant="outlined"
                  component={Link}
                  to="/interview/create"
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

import { React, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Table,
  TableCell,
  TableHead,
  IconButton,
  Box,
  Divider,
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
    "first interview",
    "second interview",
    "pending",
    "hired",
  ];
  console.log(details, "hr");
  return (
    <>
      <TableContainer component={Paper}>
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
        <Box sx={{ marginBottom: 1 }}>
          <Stepper activeStep={steps.indexOf(detail.status)} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider />
        <Table>
        
          <TableHead>
            <TableCell size="small"> ID</TableCell>
            <TableCell size="small">{detail.id}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small">Applicant Name</TableCell>
            <TableCell size="small">
              {detail.firstName} {detail.lastName}
            </TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Email</TableCell>
            <TableCell size="small">{detail.email}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small">Phone Number</TableCell>
            <TableCell size="small">{detail.phoneNumber}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Reference </TableCell>
            <TableCell size="small">{detail.reference}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Level</TableCell>
            <TableCell size="small">{detail.level}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Technology</TableCell>
            <TableCell size="small">
              {detail.technology?.map((list) => {
                return <p>{list}</p>;
              })}
            </TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Salary Expectation</TableCell>
            <TableCell size="small">{detail.salary_expectation}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell> Experience</TableCell>
            <TableCell>{detail.experience}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell size="small"> Resume</TableCell>
            <TableCell size="small">{detail.resume}</TableCell>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

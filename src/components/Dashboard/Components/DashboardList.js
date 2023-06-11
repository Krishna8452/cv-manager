import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, Card, Grid, Button, Typography, makeStyles } from "@mui/material";
import { Link } from "react-router-dom";
import LegendChart from "./LegendChart";

export default function DashboardList({
  applicantList,
  interviewerList,
  interviewList,
  offerLetterList,
  assessmentTest
}) {
  const list = [
    {
      route: "applicant",
      title: "Applicants",
      length: applicantList.length,
    },
    {
      route: "interviewer",
      title: "Interviewers",
      length: interviewerList.length,
    },
    {
      route: "interview",
      title: "Interviews",
      length: interviewList.length,
    },
    {
      route: "offerLetter",
      title: "Offer Letters",
      length: offerLetterList.length,
    },
    {
      route: "assessmentTest",
      title: "Assessment Test",
      length: assessmentTest.length,
    },
  ];
  console.log(list, "list");
  return (
    <>
      <TableContainer
        sx={{ display:'flex', justifyContent:'center', alignItems:'center',height:'4.5rem', marginBottom:2}}
        component={Paper}
      >
      <h2>Main Dashboard</h2> 
      </TableContainer>
      <Grid sx={{ display: "flex", padding:1 }}>
        <Grid sx={{ display: "flex", gap: 4}}>
          {list.map((list) => (
            <Card
              sx={{
                height: 140,
                width: 300,
                bgcolor: "white",
                borderRadius: 1,
              }}
              component={Paper}
            >
              <Typography style={{ textAlign: "center", marginTop: 20 }}>
                {list.title}
              </Typography>
              <Box sx={styles.circle}>{list.length}</Box>
              <Box
                sx={{
                  justifyContent: "right",
                  alignItems: "right",
                  textAlign: "right",
                }}
              >
                <Button component={Link} to={`/${list.route}`} size="small">
                  <Typography
                    sx={{ color: "black", fontSize: "14px" }}
                    variant="inherit"
                  >
                    visit
                  </Typography>
                </Button>
              </Box>
            </Card>
          ))}
          <Grid></Grid>
        </Grid>
      </Grid>
      <TableContainer
        sx={{ height: 360, width: 600, marginLeft: 1, marginTop: 2 }}
        component={Paper}
      >
        {applicantList && applicantList.length > 0 && (
          <LegendChart dataList={applicantList} />
        )}
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          Applicant Status
        </Typography>
      </TableContainer>
    </>
  );
}
/**@type {import("@mui/material").SxProps} */
const styles = {
  circle: {
    marginTop: "0.5rem",
    marginLeft: "6.25rem",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    backgroundColor: "#f44336",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
  },
};

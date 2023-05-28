import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, Card, Grid, Button, Typography, makeStyles } from "@mui/material";
import { Link } from "react-router-dom";
import LegendChart from "./LegendChart";
import { useState } from "react";

export default function DashboardList({
  applicantList,
  interviewerList,
  interviewList,
  offerLetterList,
}) {
  const [userData, setUserData] = useState({
    labels: applicantList.map((data) => data.status),
    datasets: [
      {
        label: "Status",
        data: applicantList.map((data) => data),
      },
    ],
  });
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
  ];
  console.log(list, "list");
  return (
    <>
      <TableContainer
        sx={{ textAlign: "center", marginTop: 1, marginBottom: 2 }}
        component={Paper}
      >
        <h2>Main Dashboard</h2>
      </TableContainer>
      <Grid sx={{ display: "flex", gap: 2 }}>
        <Grid sx={{ display: "flex", gap: 2, marginLeft: "1rem" }}>
          {list.map((list) => (
            <Card
              sx={{
                height: 130,
                width: 220,
                bgcolor: "#f7c7c6",
                borderRadius: 3,
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
                  <Typography variant="inherit">visit</Typography>
                </Button>
              </Box>
            </Card>
          ))}
        </Grid>
        <Grid> </Grid>
      </Grid>
      <LegendChart dataList={applicantList} />
    </>
  );
}
/**@type {import("@mui/material").SxProps} */
const styles = {
  circle: {
    marginTop: "0.5rem",
    marginLeft: "4.5rem",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    backgroundColor: "#6e1a16",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
  },
};

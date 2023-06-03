import React, { useEffect, useState } from "react";
import DashboardList from "../Components/DashboardList";
import LegendChart from "../Components/LegendChart";

export default function Dashboard() {
  const [applicantList, setApplicantList] = useState([]);
  const [interviewerList, setInterviewersList] = useState([]);
  const [interviewList, setInterviewList] = useState([]);
  const [offerLetterList, setOfferLetterList] = useState([]);
  const [assessmentTest, setAssessmentTest] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/applicants");
      const data1 = await response.json();
      setApplicantList(data1);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/interviewers");
      const data2 = await response.json();
      setInterviewersList(data2);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/interviews");
      const data3 = await response.json();
      setInterviewList(data3);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/offerLetters");
      const data4 = await response.json();
      setOfferLetterList(data4);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/assessmentTest");
      const data5 = await response.json();
      setAssessmentTest(data5);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  console.log();

  return (
    <>
      <DashboardList
        applicantList={applicantList}
        interviewerList={interviewerList}
        interviewList={interviewList}
        offerLetterList={offerLetterList}
        assessmentTest={assessmentTest}

      />
    </>
  );
}

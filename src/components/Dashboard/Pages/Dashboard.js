import React, { useEffect, useState } from 'react'
import DashboardList from '../Components/DashboardList'

export default function Dashboard() {
const [applicantList, setApplicantList] = useState([])
const [interviewerList, setInterviewersList] = useState([])
const [interviewList, setInterviewList] = useState([])
const [offerLetterList, setOfferLetterList] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/applicants");
      const data = await response.json();
      setApplicantList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/interviewers");
      const data = await response.json();
      setInterviewersList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/interviews");
      const data = await response.json();
      setInterviewList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    try {
      const response = await fetch("http://localhost:3031/offerLetters");
      const data = await response.json();
      setOfferLetterList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  
  console.log()
 
  return (
    <>
    <DashboardList
     applicantList={applicantList}
     interviewerList={interviewerList}
     interviewList={interviewList}
     offerLetterList={offerLetterList}
    />
    </>
  )
}

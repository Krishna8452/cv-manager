import React, { useState } from "react";
import ApplicantList from "../Components/ApplicantList";
import { Outlet } from "react-router-dom";

export default function Applicants() {
  const [list, setList] = useState([
    {
      id: 1,
      name: "Krishna Chaudhary",
      email: "krishnachaudhary8452@gmail.com",
      phone: 9987456321,
      reference: "facebook",
      technology: "ReactJs",
      level: "junior",
      salary_expectation: "20000",
      experience: "2 years",
      status: "second interview",
    },
    {
      id: 2,
      name: "Govinda Basnet",
      email: "awesomegovinda@gmail.com",
      phone: 9987456321,
      reference: "linkedln",
      technology: "dot net",
      level: "mid",
      salary_expectation: "21000",
      experience: "1 year",
      status: "pending",
    },
    {
      id: 3,
      name: "Rinku Chaudhary",
      email: "rinkuchaudhary@gmail.com",
      phone: 9985456321,
      reference: "Friends",
      technology: "ReactJs",
      level: "Senior",
      salary_expectation: "100k",
      experience: "4 years",
      status: "first interview",
    },
    {
      id: 4,
      name: "Suraj Basnet",
      email: "surajbasnet@gmail.com",
      phone: 9987446321,
      reference: "Friends",
      technology: "VueJs",
      level: "Junior",
      salary_expectation: "23000",
      experience: "24000",
      status: "hired",
    },
    {
      id: 5,
      name: "Akriti Bhattarai",
      email: "akriti@gmail.com",
      phone: 9987456321,
      reference: "Friends",
      technology: "Dotnet",
      level: "senior",
      salary_expectation: "30000",
      experience: "2 years",
      status: "shortlisted",
    },
    {
      id: 6,
      name: "Anisha manandhar",
      email: "anisha@gmail.com",
      phone: 9987456321,
      reference: "facebook",
      technology: "NextJs",
      level: "Senior",
      salary_expectation: "25000",
      experience: "2 year",
      status: "second interview",
    },
  ]);
  return (
    <>
      <ApplicantList List={list} />
      <Outlet />
    </>
  );
}

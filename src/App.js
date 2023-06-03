import React from "react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Header from "./Shared/Navigation/Header";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Account from "./pages/Account";
import { ExperiencedApplicants } from "./components/ExperiencedApplicants/Pages/ExperiencedApplicants";
import { Experience } from "./components/Experience/Pages/Experience";
import { Interviewer } from "./components/Interviewer/Pages/Interviewer";
import ApplicantForm from "./components/Applicants/Components/ApplicantForm";
import Interview from "./components/Interview/pages/Interview";
import InterviewerForm from "./components/Interviewer/Components/InterviewerForm";
import InterviewForm from "./components/Interview/components/InterviewForm";
import OfferLetter from "./components/OfferLetter/Pages/OfferLetter";
import OfferLetterForm from "./components/OfferLetter/Components/OfferLetterForm";
import AssessmentTest from "./components/AssessmentTest/Pages/AssessmentTest";
import Dashboard from "./components/Dashboard/Pages/Dashboard";
import AssessmentTestForm from "./components/AssessmentTest/Components/AssessmentTestForm";
import ApplicantList from "./components/Applicants/Components/ApplicantList";
import { TemplateLetter } from "./components/TemplateLetter/Pages/TemplateLetter";
import TemplateLetterForm from "./components/TemplateLetter/Components/TemplateLetterForm";
function App() {
  return (
    <ProSidebarProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <Account>
              <Dashboard />
            </Account>
          }
        />

        <Route
          path="/applicant"
          element={
            <Account>
              <ApplicantList />
            </Account>
          }
        />
        <Route
          path="/applicant/create"
          element={
            <Account>
              <ApplicantForm />
            </Account>
          }
        />
        <Route
          path="/applicant/edit/:id"
          element={
            <Account>
              <ApplicantForm />
            </Account>
          }
        />
        <Route
          path="/experience"
          element={
            <Account>
              <Experience />
            </Account>
          }
        />

        <Route
          path="/experienceApplicants"
          element={
            <Account>
              <ExperiencedApplicants />
            </Account>
          }
        />
        <Route
          path="/interviewer"
          element={
            <Account>
              <Interviewer />
            </Account>
          }
        />
        <Route
          path="/interviewer/create"
          element={
            <Account>
              <InterviewerForm />
            </Account>
          }
        />
        <Route
          path="/interviewer/edit/:id"
          element={
            <Account>
              <InterviewerForm />
            </Account>
          }
        />

        <Route
          path="/interview"
          element={
            <Account>
              <Interview />
            </Account>
          }
        />
        <Route
          path="/interview/create"
          element={
            <Account>
              <InterviewForm />
            </Account>
          }
        />
        <Route
          path="/interview/edit/:id"
          element={
            <Account>
              <InterviewForm />
            </Account>
          }
        />
        <Route
          path="/offerLetter"
          element={
            <Account>
              <OfferLetter />
            </Account>
          }
        />
        <Route
          path="/offerLetter/create"
          element={
            <Account>
              <OfferLetterForm />
            </Account>
          }
        />
        <Route
          path="/offerLetter/edit/:id"
          element={
            <Account>
              <OfferLetterForm />
            </Account>
          }
        />
        <Route
          path="/assessmentTest"
          element={
            <Account>
              <AssessmentTest />
            </Account>
          }
        />
        <Route
          path="/assessmentTest/create"
          element={
            <Account>
              <AssessmentTestForm />
            </Account>
          }
        />
        <Route
          path="/assessmentTest/edit/:id"
          element={
            <Account>
              <AssessmentTestForm />
            </Account>
          }         
        />  
        <Route
          path="/templateLetter"
          element={
            <Account>
              <TemplateLetter />
            </Account>
          }         
        />
       <Route
          path="/templateLetter/create"
          element={ 
            <Account>
              <TemplateLetterForm />
            </Account>
          }         
        />
        <Route
          path="/templateLetter/edit/:id"
          element={
            <Account>
              <TemplateLetterForm />
            </Account>
          }         
        />
        <Route
          path="/templateLetter/detail/:id"
          element={
            <Account>
            </Account>
          }         
        />
      </Routes>
      
    </ProSidebarProvider>
  );
}
export default App;

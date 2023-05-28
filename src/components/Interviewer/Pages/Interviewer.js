import React from 'react' 
import InterviewerList from '../Components/InterviewerList'

export const Interviewer = () => {
  const interviewerList=[
    {
    interviewerName:'Dipendra Karki',
    email:'dipendra@gmail.com',
    position:'Senior'
  },
  {
    interviewerName:'Rasna adhikari',
    email:'rashna@gmail.com',
    position:'HR'
  },
  {
    interviewerName:'Niru Prajapati',
    email:'niru@gmail.com',
    position:'Senior'
  },
  {
    interviewerName:'Rinku Chaudhary',
    email:'rinku@gmail.com',
    position:'Senior'
  },
  {
    interviewerName:'Govinda Basnet',
    email:'govinda@gmail.com',
    position:'HR'
  }
]
  return (
    <>
    <InterviewerList list={interviewerList}/>
    </>
  )
}
 
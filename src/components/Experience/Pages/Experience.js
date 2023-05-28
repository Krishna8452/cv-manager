import React,{useState} from 'react'
import Experiencelist from '../Components/ExperienceList'

export const Experience = () => {
  const ExperienceList=[
    {
      id:1,
      CompanyName:"Amnil Technologies",
      StartedDate:"2022/01/22" ,
      EndDate:"2023/01/22",
      Position:"Junior dotnet Developer",
      Responsibilities: "debugging",
      Certificates:"certificate.pdf"
    },
    {
      id:2,
      CompanyName:"Leapfrog Technologies",
      StartedDate:"2022/01/22" ,
      EndDate:"2023/01/22",
      Position:"Associate Backend Developer",
      Responsibilities: "developing UI",
      Certificates:"certificate.pdf"
    },
    {
      id:3,
      CompanyName:"EasyAccess Technologies",
      StartedDate:"2022/01/22" ,
      EndDate:"2023/01/22",
      Position:"Senior dotnet Developer",
      Responsibilities: "Mentoring",
      Certificates:"certificate.pdf"
    },
    {
      id:4,
      CompanyName:"Verix Technologies",
      StartedDate:"2022/01/22" ,
      EndDate:"2023/01/22",
      Position:"Senior Frontend Developer",
      Responsibilities: "debugging and testing UI",
      Certificates:"certificate.pdf"
    }
  ]
  return (<>
  <Experiencelist list={ExperienceList}/>
  </>)
}

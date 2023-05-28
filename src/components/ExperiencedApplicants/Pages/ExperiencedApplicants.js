import React, { useState } from 'react'
import { ExperiencedApplicantsList } from '../Components/ExperiencedApplicantsList'

export const ExperiencedApplicants = () => {
  const expList= [
    {
      id:1,
      fullName: 'Krishna Chaudhary',
      phoneNumber: '123-456-7890',
      email: 'kishna@gmail.com',
      level: 'Assosiate',
      references:"facebook",
      technology: 'React',
      status: 'Hired',
      expectedSalary: 50000,
      resume: 'resume.pdf',
      experiences: [
        {
          companyName: 'Amnil Technologies',
          startedDate: '2020-01-01',
          endDate: '2022-12-31',
          position: 'Software Engineer',
          responsibilities: 'Developed and maintained web applications.',
          certificates: ['certificate1.jpg', 'certificate2.pdf'],
        },
        {
          companyName: 'Krimson Corporation',
          startedDate: '2018-06-01',
          endDate: '2019-12-31',
          position: 'Intern',
          responsibilities: 'Assisted with testing and debugging.',
          certificates: ['certificate3.png'],
        },
      ]
      },
      {
        id:2,
        fullName: 'Govinda Basnet',
        phoneNumber: '123-456-7890',
        email: 'johndoe@example.com',
        level: 'Intermediate',
        references: "linkedIn",
        status: 'Available',
        expectedSalary: 50000,
        resume: 'resume.pdf',
        experiences: [
          {
            companyName: 'ABC Company',
            startedDate: '2020-01-01',
            endDate: '2022-12-31',
            position: 'Software Engineer',
            responsibilities: 'Developed and maintained web applications.',
            certificates: ['certificate1.jpg', 'certificate2.pdf'],
          },
          {
            companyName: 'XYZ Corporation',
            startedDate: '2018-06-01',
            endDate: '2019-12-31',
            position: 'Senior',
            responsibilities: 'Assisted with testing and debugging.',
            certificates: ['certificate3.png'],
          },
        ]
        },
        {
          id:3,
          fullName: 'Bijay Kandel',
          phoneNumber: '123-456-7890',
          email: 'bijay@gmail.com',
          level: 'Assosiate',
          references:"LinkedIn",
          technology: 'Devops',
          status: 'Hired',
          expectedSalary: 50000,
          resume: 'resume.pdf',
          experiences: [
            {
              companyName: 'Amnil Technologies',
              startedDate: '2020-01-01',
              endDate: '2022-12-31',
              position: 'Software Engineer',
              responsibilities: 'Developed and maintained web applications.',
              certificates: ['certificate1.jpg', 'certificate2.pdf'],
            },
            {
              companyName: 'Leafrog Technologies',
              startedDate: '2018-06-01',
              endDate: '2019-12-31',
              position: 'Intern',
              responsibilities: 'Assisted with testing and debugging.',
              certificates: ['certificate3.png'],
            },
          ]
          },
          {
            id:4,
            fullName: 'Suraj Basnet',
            phoneNumber: '123-456-7890',
            email: 'suran@example.com',
            level: 'Intern',
            references: "linkedIn",
            status: 'Available',
            expectedSalary: 50000,
            resume: 'resume.pdf',
            experiences: [
              {
                companyName: 'Verix technologies',
                startedDate: '2020-01-01',
                endDate: '2022-12-31',
                position: 'Software Engineer',
                responsibilities: 'Developed and maintained web applications.',
                certificates: ['certificate1.jpg', 'certificate2.pdf'],
              },
              {
                companyName: 'Leafrog technologies',
                startedDate: '2018-06-01',
                endDate: '2019-12-31',
                position: 'Senior',
                responsibilities: 'Assisted with testing and debugging.',
                certificates: ['certificate3.png'],
              },
            ]
            }
  ]
  return (
  <>
  <ExperiencedApplicantsList expApplicantList={expList}/>
  </>
  )
}

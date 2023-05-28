
import React from 'react'
import {Routes, Route} from "react-router-dom"
import Applicants from '../components/Applicants/Pages/Applicants'

export default function AppRoutes() {
  return (<Routes>
    <Route path="/account/hello" element={<p>Hello</p>}/>
    <Route path="/ab" element={<p> what is your name ?</p>}/>
    {/* <Route path="/applicantList" element={<Dashboard/>}/>
    <Route path="/Experience" element={<Dashboard/>}/>
    <Route path="/Interviwer" element={<Dashboard/>}/>
    // <Route path="/Assessment" element={<Dashboard/>}/> */} 
    </Routes> )
}

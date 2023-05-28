import React from 'react'
import { Routes, Route } from 'react-router-dom'

export default function Protectedd() {
  return (<Routes>
    <Route path='/hello' element={<p>Hello</p>}/>
  </Routes>
  
  )
}

import React from 'react'
import OfferLetterList from '../Components/OfferLetterList'
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
  Icon,
  IconButton,
  Box
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function OfferLetter(){
  const navigate =useNavigate()
  return (
  <>
    <TableContainer sx={{ display: "flex", justifyContent:'center', alignItems:'center', height:'4.5rem'}} component={Paper}>
      <IconButton onClick={()=>navigate('/dashboard')}>
          <ArrowBackIcon/>
      </IconButton>
      <h2 style={{ marginLeft: "40%" }}>
        Offer Letter List
      </h2>
      <Box sx={{flexGrow:1}}/>
      <IconButton onClick={()=>navigate("/offerLetter/create")} sx={{marginRight:'1%', color: green[500], textAlign: "right" }}>
        <Icon title="create" fontSize="large">
          add_circle
        </Icon>
      </IconButton>
    </TableContainer>
      <OfferLetterList/>  
</>
)
}

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
    <TableContainer sx={{ display: "flex", marginTop: 1 }} component={Paper}>
      <IconButton onClick={()=>navigate('/dashboard')}>
          <ArrowBackIcon/>
      </IconButton>
      <h1 style={{ marginLeft: "34%" }}>
        Offer Letter List
      </h1>
      <Box sx={{flexGrow:1}}/>
      <IconButton onClick={()=>navigate("/offerLetter/create")} sx={{ color: green[500], textAlign: "right" }}>
        <Icon title="create" fontSize="large">
          add_circle
        </Icon>
      </IconButton>
    </TableContainer>
      <OfferLetterList/>  
</>
)
}

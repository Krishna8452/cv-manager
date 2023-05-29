import React from 'react'
import {IconButton, Box, Table, TableCell,TableHead, Typography} from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

export const InterviewDetail = ({onClick, details}) => {
  const interviewDetail = details[0]
  console.log(interviewDetail,'intdeee')
  return (
  <>    <Box
          style={{
            display:'flex',
            border: "2px",
            justifyContent: "right",
          }}
        >
      <h2 style={{marginLeft:'13rem'}}>Details</h2>   
        <Box sx={{flexGrow:1}}/>
        <Box>
          <IconButton color={"red"} onClick={onClick} title="Cancel">
            <CancelIcon />
          </IconButton>
        </Box>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{textAlign:'center'}}>

      <TableHead>
        <TableCell> ID</TableCell>
        <TableCell>{interviewDetail.id}</TableCell>
      </TableHead>

      <TableHead>
        <TableCell> Applicant</TableCell>
        <TableCell>{interviewDetail.applicant}</TableCell>
      </TableHead>  

      <TableHead>
        <TableCell>Interviewers</TableCell>             
        <TableCell>
        {interviewDetail.interviewers?.map((list) => {
          return <> {list}, </>;
        })}
        </TableCell>
      </TableHead>

      <TableHead>
        <TableCell>Date</TableCell>
        <TableCell>{interviewDetail.date}</TableCell>
      </TableHead> 

      <TableHead>
        <TableCell>Time</TableCell>
        <TableCell>{interviewDetail.time}</TableCell>
      </TableHead> 
      </Table>
    </TableContainer>
    </>

  )
}

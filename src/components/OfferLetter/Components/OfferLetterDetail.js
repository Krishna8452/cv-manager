import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableCell,
  TableHead,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import { Link } from "react-router-dom";

export default function OfferLetterDetail({ details, onClick }) {
  const detail = details[0];
  console.log(detail, "he");
  return (
    <>
      <TableContainer
        sx={{ marginTop: 1, gap: 10,height:"40%", width:"30%",marginTop:'8%', marginLeft:'30%'}}
        component={Paper}
      >
        <Box display={"flex"}>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            style={{
              color: "red",
              border: "2px",
              justifyContent: "center",
              alignItem: "center",
              gap: "3rem",
            }}
          >
            <Link to={`/offerLetter/edit/${detail.id}`}>
              <IconButton title="edit">
                <EditIcon color="primary" />
              </IconButton>
            </Link>
          </Box>
          <Box
            style={{
              marginLeft: "1rem",
              display: "flex",
              color: "red",
              border: "2px",
              justifyContent: "right  ",
            }}
          >
            <IconButton onClick={onClick} title="Cancel">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider />
        <Table padding="1rem">
          <TableHead>
            <TableCell size="small"> ID</TableCell>
            <TableCell>{detail.id}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell> Applicant</TableCell>
            <TableCell>{detail.applicant}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell> Content</TableCell>
            <TableCell>{detail.editor}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell> Status</TableCell>
            <TableCell>{detail.status}</TableCell>
          </TableHead>
          <TableHead>
            <TableCell>Letter File</TableCell>
            <TableCell>{detail.letterFile}</TableCell>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

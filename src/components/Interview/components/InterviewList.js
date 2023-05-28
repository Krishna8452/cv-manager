import { React, useEffect, useCallback } from "react";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Link , useNavigate } from "react-router-dom";
import { InterviewDetail } from "./InterviewDetail";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function InterviewList() {
  const navigate= useNavigate()
  const [interviewList, setInterviewList] = useState([]);
  const [open, setOpen] = useState(false);
  const [storeId, setStoreId] = useState();
  // const [interviewerName, setInterviewerName] = useState({});
  // const [applicantName, setApplicantName] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/interviews");
      const data = await response.json();
      setInterviewList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  {
    console.log(interviewList, "hhh");
  }

  // const fetchInterviewerName = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3031/interviewers/${id}`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching interviewer:", error);
  //   }
  // };
  // const fetchApplicantName = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3031/applicants/${id}`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching applicant:", error);
  //   }
  // };

  const handleClickOpen = useCallback(
    (id) => {
      setStoreId(id);
      setOpen(true);
    },
    [open]
  );
  const [details, setDetails] = useState({});
  const [detailMode, setDetailMode] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  function viewInterviewer(id) {
    const interviewer = interviewList.filter((data) => data.id === id);
    setDetails(interviewer);
    setDetailMode(true);
  }

  function deleteInterviewer(id) {
    console.log(id,'hello')
    axios.delete(`http://localhost:3031/interviews/${id}`)
    setInterviewList((list) =>
    list.filter((list) => list.id !== id)
  );
    setOpen(false);
  }
  return (
    <>
      <TableContainer sx={{display:'flex', marginTop: 1 }} component={Paper}>
        <IconButton onClick={()=>navigate('/dashboard')}>
          <ArrowBackIcon/>
        </IconButton>
        <h1 style={{ marginLeft: "37%" }}>Interview List</h1>
        <Box sx={{ flexGrow: 1 }}/>
        <Box sx={{ marginLeft: "15px", display: "flex" }}>
   
            <IconButton onClick={()=>navigate('/interview/create')}>
              <Icon
                sx={{ color: green[500], textAlign: "right" }}
                fontSize="large"
              >
                add_circle
              </Icon>
            </IconButton>
         
        </Box>
      </TableContainer>
      <Modal
        open={detailMode}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InterviewDetail
            onClick={() => setDetailMode(false)}
            details={details}
          />
        </Box>
      </Modal>

      <TableContainer sx={{ marginTop: 1 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableCell size="small">Interviewer </TableCell>
            <TableCell size="small">Applicant</TableCell>
            <TableCell size="small">Date</TableCell>
            <TableCell size="small">Time</TableCell>
            <TableCell size="small">Action</TableCell>
          </TableHead>
    
            {interviewList.map((list) => {
              return<>
            <TableBody>
            <TableCell size="small">{list.interviewers?.map((interviewer)=>{
              return <p>{interviewer?.name}</p>
            })}
            </TableCell>
            <TableCell size="small">{list.applicant}</TableCell>
            <TableCell size="small">{list.date}</TableCell>
            <TableCell size="small">{list.time}</TableCell>
            <TableCell size="small">
              <ButtonGroup>
                <Button
                  onClick={() => viewInterviewer(list.id)}
                  variant="outlined"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                >
                  view
                </Button>
                <Link to={`/interview/edit/${list.id}`}>
                   <Button color="primary" startIcon={<EditIcon />}>
                     edit
                   </Button>
                 </Link>
                <Button
                  onClick={() => handleClickOpen(list.id)}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableBody>
          </>
           })
         }
        </Table>

        <Dialog
          sx={{ justifyContent: "center" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            Are you sure you want to delete the Interview ?
          </DialogTitle>
          <DialogContent>Your data will be lost Permanently.</DialogContent>
          <IconButton size="large" variant="contained" color="error">
            <DeleteIcon/>
          </IconButton>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Box sx={{ flexGrow: 1 }}/>
            <Button variant="contained" color="error" onClick={() => deleteInterviewer(storeId)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  maxHeight: "50%",
};

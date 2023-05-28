import {React,useEffect, useCallback} from "react";
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
  Divider,
  IconButton,
  Typography,
  TextField,
  ToggleButtonGroup,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { InterviewerDetail } from "./InterviewerDetail";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function InterviewerList() {
  const navigate=useNavigate() 
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false)
  const [storeId,setStoreId] = useState()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/interviewers");
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

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
   const interviewer = list.filter((data) => data.id === id);
   setDetails(interviewer)
   setDetailMode(true)
    }
  
  function deleteInterviewer(id) {
    axios.delete(`http://localhost:3031/interviewers/${id}`)
    setList((list) =>
      list.filter((list) => list.id !== id)
    );
    setOpen(false);
  }
  console.log(details,'details')
  return (
    <>
      <TableContainer sx={{display:'flex', marginTop: 1 }} component={Paper}>
        <IconButton onClick={()=>navigate('/dashboard')}>
          <ArrowBackIcon/>
        </IconButton>
        <>
        <h1 style={{ marginLeft:'34%'}}>Interviewer List</h1>

        <Box sx={{flexGrow:1}}/>

        <Box sx={{ marginLeft: "15px", display: "flex" }}>
          <Search
            sx={{
              borderColor: "red",
              borderRadius: "15px",
              justifyContent: "center",
              alignContent: "center",
              height:'3rem',
              marginTop:4
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              // onChange={(e)=>setSearchedData(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ justifyContent: "center", left: 15 }}
            />
          </Search>
     
          <IconButton onClick={()=>navigate('/interviewer/create')}>
            <Icon
              sx={{ color: green[500], textAlign: "right" }}
              fontSize="large"
            >
              add_circle
            </Icon>
          </IconButton>
        </Box>
        </>
      </TableContainer>
      <Modal
        open={detailMode}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InterviewerDetail
            onClick={() => setDetailMode(false)}
            details={details}
          />
        </Box>
      </Modal>

      <TableContainer sx={{ marginTop: 1 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableCell size="small">Interviewer Name</TableCell>
            <TableCell size="small">Email</TableCell>
            <TableCell size="small">Position</TableCell>
            <TableCell size="small">Action</TableCell>
          </TableHead>
          {list.map((list) => {
            return (
              <>
                <TableBody>
                  <TableCell size="small">{list.interviewerName}</TableCell>
                  <TableCell size="small">{list.email}</TableCell>
                  <TableCell size="small">{list.position}</TableCell>
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
                    
                      <Button
                        onClick={()=>navigate(`/interviewer/edit/${list.id}`)}
                        color="primary"
                        startIcon={<EditIcon/>}
                      >
                        edit
                      </Button>
              
                      <Button
                        onClick={()=>handleClickOpen(list.id)}
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
            );
          })}
        </Table>
        <Dialog
              sx={{ justifyContent: "center" }}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>
                Are you sure you want to delete the interviewer ?
              </DialogTitle>
              <DialogContent>
               Your data will be lost
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => deleteInterviewer(storeId)} autoFocus>
                  Agree
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
  border: "1px",
  borderRadius: "10px",
  boxShadow: 24,
  maxHeight: "50%",
  padding:'1rem'
};
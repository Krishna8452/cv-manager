import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Box,Icon,IconButton, Paper, Table, TableCell, TableContainer, Typography,TableHead, TableBody, ButtonGroup, Button, Dialog, DialogActions,DialogContent,DialogTitle} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { green } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const PositionList = () => {
    const [templateLetterList, setTemplateLetterList]= useState()
    const [deleteId,setDeleteId] = useState()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3031/positions");
          const data = await response.json();
          setTemplateLetterList(data);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
     const handleClickOpen = (id)=> {
        setDeleteId(id)
        setOpen(true)
     }
     const handleClose = () => {
        setOpen(false);
      };
    const deleteTemplateLetter = (id)=>{
        axios.delete(`http://localhost:3031/positions/${id}`);
        setTemplateLetterList((list) => list.filter((list) => list.id !== id));
        setOpen(false)

    }
 console.log(templateLetterList,'dddd')
  return (
    <>
   <TableContainer sx={{ display: "flex", marginTop: 1 }} component={Paper}>
        <IconButton onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
        </IconButton>
        <>
          <h1 style={{ marginLeft: "34%" }}>Position List</h1>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ marginLeft: "15px", display: "flex" }}>
            <Search
              sx={{
                borderColor: "red",
                borderRadius: "15px",
                justifyContent: "center",
                alignContent: "center",
                height: "3rem",
                marginTop: 4,
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

            <IconButton onClick={() => navigate("/position/create")}>
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

    <Table>
        <TableHead>
            <TableCell size='small'>Name</TableCell>
            <TableCell size='small'>Action</TableCell>
        </TableHead>
        {templateLetterList && templateLetterList.length>0 &&   templateLetterList.map((list)=>{ 
        return <>
        <TableBody>
            <TableCell size='small'>{list.position}</TableCell>
            <TableCell>
                <ButtonGroup>
                <Button
                        onClick={() => navigate(`/templateLetter/detail/${list.id}`)}
                        variant="outlined"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                      >
                        view
                      </Button>

                      <Button
                        onClick={() => navigate(`/templateLetter/edit/${list.id}`)}
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        edit
                      </Button>

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
         })}
    </Table>
    <Dialog
          sx={{ justifyContent: "center" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            Are you sure you want to delete the Position ?
          </DialogTitle>
          <DialogContent>Your data will be lost</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button><Box sx={{flexGrow:1}}/>
            <Button variant='outlined' color='error' onClick={() => deleteTemplateLetter(deleteId)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
   </>
  )
  
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
    padding: "1rem",
  };
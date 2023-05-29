import { useEffect,useState,React} from 'react'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  ButtonGroup,
  IconButton,
  DialogContent,
  Dialog,
  DialogActions,DialogTitle
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function  OfferLetterList(){
const navigate = useNavigate()

const [offerLettersList,setOfferlettersList] = useState([])
const [open, setOpen]= useState()
const [storeId, setStoreId] = useState()
useEffect(() => {
  fetchData();
},[]);

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3031/offerLetters");
    const data = await response.json();
    setOfferlettersList(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const handleClickOpen = (id)=>{
  setStoreId(id);
  setOpen(true);
}
const handleClose = () => {
  setOpen(false);
};
const viewOfferList =()=>{
alert('view action')
}
const deleteOfferLetter = (storeId)=>{
  axios.delete(`http://localhost:3031/offerLetters/${storeId}`);
  setOfferlettersList((list) =>
  list.filter((list) => list.id !== storeId)
);
  setOpen(false);
}
 console.log(offerLettersList,'fdffdfdfd')
  return <>    
    <TableContainer sx={{ display: "flex", marginTop: 1 }} component={Paper}>
    <Table>
      <TableHead>
        <TableCell>Applicant</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Content</TableCell>
        <TableCell>LetterFile</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      {offerLettersList.map((data)=>{
        return <>
      <TableBody>         
        <TableCell>{data.applicant}</TableCell>
        <TableCell>{data.status}</TableCell>
        <TableCell>{data.editor}</TableCell>
        <TableCell>{data.letterFile}</TableCell>

        <TableCell>

        <ButtonGroup>
                <Button
                  onClick={() => viewOfferList()}
                  variant="outlined"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                >
                  view
                </Button>
                   <Button 
                   onClick={() =>navigate(`/offerLetter/edit/${data.id}`)}
                   color="primary"
                   startIcon={<EditIcon />}
                   >
                  edit
                </Button>
                <Button
                  onClick={() => handleClickOpen(data.id)}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </ButtonGroup>
        </TableCell>
           
      </TableBody>
      </>})}
    </Table>
    <Dialog
      sx={{ justifyContent: "center" }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle >
        <h2 style={{textAlign:'center'}}>Do you want to Delete?</h2>
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete the applicant ?
      </DialogContent>
      <DialogActions>
        <Button sx={{textAlign:'left'}} onClick={handleClose}>Disagree</Button>
        <Button variant="contained" color="error" onClick={() => deleteOfferLetter(storeId)} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </TableContainer>
  </>
  
}

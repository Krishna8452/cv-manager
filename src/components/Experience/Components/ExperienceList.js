import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { green } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import {Icon, Box, Button, Table, TableBody, TableCell, TableHead , ButtonGroup, Divider, IconButton, TextField} from '@mui/material'
import ExperienceApplicantDetail from './ExperienceDetail';

export default function Experiencelist({list}){
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(false);
  const [searchedData, setSearchedData]= useState('')
  const [ storeId, setStoreId] = useState()
 
  const handleClickOpen = (id) => {
    setStoreId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [experienceApplicantList,setExperienceApplicantList] = useState(list)
  const [ expAppDetail, setExpAppDetail] = useState({})
  const [ detailMode, setDetailMode] = useState(false)

  const [ editMode, setEditMode] = useState(false)
  const [ editedData, setEditedData] = useState(
    {
      id:null,
      CompanyName:" ",
      StartedDate:"" ,
      EndDate:"",
      Position:"",
      Responsibilities:"",
      Certificates:""
    }
    )

    function viewApplicantExperience(id){
      const details = (experienceApplicantList.filter((data)=>data.id===id))
      setDetailMode(true)
      setExpAppDetail(details)        
    }
    function editApplicantExperience(id){
      const applicantToEdit = experienceApplicantList.find((applicant)=> applicant.id === id) 
      setEditedData(applicantToEdit)
      setEditMode(true)        
    }
    
    function deleteApplicantExperience(id){
      setExperienceApplicantList((experienceApplicantList) => experienceApplicantList.filter((list) => list.id !== id));
      setOpen(false)
        console.log(id,'idddd')
    }
    function handleSave(){
   
      setExperienceApplicantList  ((prevDataList) =>
      prevDataList.map((data) => (data.id === editedData.id ? editedData : data))
    );
    setEditedData({ id: null, name: '', age: null });
    setEditMode(false);
    }

  if(experienceApplicantList.length===0){
      return(
        <div className='center '>
          <h2>No Applicant found.</h2>             
        </div>
      )
  }
    console.log(formMode,'done')
  return (
    <> 
    <TableContainer sx={{marginTop:1}} component={Paper}>
    <h1 style={{textAlign:'center'}}>Experience List</h1>

    <Box sx={{marginLeft:"15px", display:'flex'}}> 

        <Search sx={{border:2,borderColor:'red' ,borderRadius:"15px", justifyContent:'center',alignContent:'center', marginBottom:'1rem'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e)=>setSearchedData(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{justifyContent:'center',  left:15}}
            />
        </Search> 
        <Box sx={{flexGrow:1}}/>  
        <Link to='/experience/create'>  
        <IconButton>
          <Icon sx={{ color: green[500], textAlign: 'right'}} fontSize='large'>add_circle</Icon>
        </IconButton>
        </Link>
    </Box>
    </TableContainer>
    {editMode&& <>
      {console.log(editedData,'boom')}
      <TableContainer sx={{marginTop:2}} component={Paper}>
          <div style={{ display: 'flex',color:'red', border:'2px', justifyContent:'right'}}>
          <IconButton onClick={()=>setEditMode(false)} title='Cancel'>
              <CancelIcon/>
          </IconButton>
          </div>
          <Box sx={{display:'grid', alignItems:'center', justifyContent:'space-between', alignContent:'center '}}>
            <Box>
              <TextField variant='standard' type='text' label='Company Name' value={editedData.CompanyName} onChange={(e)=>setEditedData({...editedData, CompanyName: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='Start Date' value={editedData.StartedDate} onChange={(e)=>setEditedData({...editedData, StartedDate: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='Start Date' value={editedData.StartedDate} onChange={(e)=>setEditedData({...editedData, StartedDate: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='End Date' value={editedData.EndDate} onChange={(e)=>setEditedData({...editedData, EndDate: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='Position' value={editedData.Position} onChange={(e)=>setEditedData({...editedData, Position: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='Responsibilities' value={editedData.Responsibilities} onChange={(e)=>setEditedData({...editedData, Responsibilities: e.target.value})}/>
            </Box>
            <Box>
              <TextField variant='standard' type='text' label='Certificates' value={editedData.Certificates} onChange={(e)=>setEditedData({...editedData, Certificates: e.target.value})}/>
            </Box>
            <Box>
              <Button onClick={handleSave} startIcon={<UpgradeIcon/>}>Updata</Button>
            </Box>
        </Box>
      </TableContainer>
    </>}
  
    {!detailMode && !editMode && !formMode && <>
    <Divider/>
    <TableContainer sx={{marginTop:1}} component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
          <TableCell>Company Name</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Responsibilities</TableCell>
          <TableCell>Action</TableCell>
          
      </TableHead>
        {experienceApplicantList.filter(applicant=>applicant.CompanyName.toLowerCase().includes(searchedData.toLowerCase())).map(list=>{
        return(
        <>
           <TableBody>
            <TableCell>{list.CompanyName}</TableCell>
            <TableCell>{list.Position}</TableCell>
            <TableCell>{list.Responsibilities}</TableCell>
            <TableCell>
            <ButtonGroup variant="outlined" aria-label="small button group">
              <Button onClick={()=>viewApplicantExperience(list.id)} variant='outlined' color='primary' startIcon={<VisibilityIcon/>}>view</Button>
              <Button onClick={()=>editApplicantExperience(list.id)} color="primary" startIcon={<EditIcon/>}>edit</Button>
              <Button onClick={()=>handleClickOpen(list.id)} color="error" startIcon={<DeleteIcon/>}>delete</Button>
              </ButtonGroup>
           </TableCell>
            </TableBody>
        </>
      )})}
     
    </Table>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        Are you sure you want to delete this Applicant ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={()=>deleteApplicantExperience(storeId)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </TableContainer></>}
  {detailMode && <ExperienceApplicantDetail detail={expAppDetail} onClick={()=>setDetailMode(false)}/>}
  </>
  )
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));  
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
      width: '20ch',
      },
    },
  },
}));

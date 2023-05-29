import React, { useCallback, useEffect } from "react";
import { useState } from "react";
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
  DialogContent,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ApplicantDetails } from "./ApplicantDetails";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination";
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
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px  ",
  borderRadius: "10px",
  boxShadow: 24,
  maxHeight: "50%",
};

function ApplicantList() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState("");
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/applicants");
      const data = await response.json();
      var myList = data;
      setList(data);
      // const totaldata = data.length;
      // setTotalData(totaldata);
      // var pagesize = Math.ceil(totaldata / offset);
      // setPageSize(pagesize);
      // var startRecord = Math.max(currentPage - 1, 0) * offset;
      // var endRecord = startRecord + offset;
      // var paginatedItems = myList.splice(startRecord, endRecord);
      // setPaginatedItems(paginatedItems);
      // console.log(paginatedItems);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const [details, setDetails] = useState({});
  const [showDetail, setShowDetail] = useState(false);

  const [formMode, setFormMode] = useState(false);
  function formClose() {
    setFormMode(false);
  }

  const [pageSize, setPageSize] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [open, setOpen] = useState(false);
  const [storeId, setStoreId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  // const handleChange = (event, value) => {
  //   debugger;
  //   var currentPage = event.target.innerText;
  //   setCurrentPage(currentPage);
  //   var startRecord = Math.max(currentPage - 1, 0) * offset;
  //   var endRecord = startRecord + offset;
  //   var paginatedItems = list.slice(startRecord, endRecord);
  //   setList(paginatedItems);
  // };
  const handleClickOpen = useCallback(
    (id) => {
      setStoreId(id);
      setOpen(true);
    },
    [open]
  );
  const handleClose = () => {
    setOpen(false);
  };
  function viewApplicant(id) {
    const applicantDetails = list.filter((data) => data.id === id);
    setShowDetail(true);
    setDetails(applicantDetails);
    console.log(details, "aaaaa");
  }
  function deleteApplicant(id) {
    axios.delete(`http://localhost:3031/applicants/${id}`);
    setList((list) =>
    list.filter((applicant) => applicant.id !== id)
    );
    setOpen(false);
  }

  return (
    <div style={{ height: "100%" }}>
      <TableContainer
        sx={{ display: "flex", marginTop: 1, marginBottom: 2 }}
        component={Paper}
      >
        <IconButton onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
        </IconButton>

        <h2 style={{ marginLeft: "37%" }}> Applicant List</h2>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Search
            sx={{
              height: "45px",
              border: "2px",
              borderRadius: "15px",
              justifyContent: "right",
              alignContent: "right",
              alignItems: "right",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setSearchedData(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ justifyContent: "center", left: 15 }}
            />
          </Search>
        </Box>
        <Link to="/applicant/create">
          <IconButton sx={{ color: green[500], textAlign: "right" }}>
            <Icon title="create" fontSize="large">
              add_circle
            </Icon>
          </IconButton>
        </Link>
      </TableContainer>

      {showDetail && (
        <>
          <ApplicantDetails
            onClick={() => setShowDetail(false)}
            details={details}
          />
        </>
      )}
      {!showDetail && (
        <>
          <TableContainer sx={{ marginTop: 1 }} component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableCell size="small">Name</TableCell>
                <TableCell size="small">Email</TableCell>
                <TableCell size="small">Phone Number</TableCell>
                <TableCell size="small">Phone Number</TableCell>
                <TableCell size="small">Status</TableCell>
              </TableHead>
              {list
                .filter((user) =>
                  user.firstName
                    .toLowerCase()
                    .includes(searchedData.toLowerCase())
                )
                .map((applicant) => {
                  return (
                    <TableBody>
                      <TableCell size="small">
                        <Button
                          onClick={() => viewApplicant(applicant.id)}
                          sx={{ color: "black", fontStyle: "normal" }}
                        >
                          {applicant.firstName} {applicant.lastName}
                        </Button>
                      </TableCell>
                      <TableCell size="small">{applicant.email}</TableCell>
                      <TableCell>{applicant.phoneNumber}</TableCell>
                      <TableCell>{applicant.status}</TableCell>
                      <TableCell size="small">
                        <ButtonGroup
                          variant="outlined"
                          aria-label="small button group"
                        >
                          <Button
                            onClick={() => viewApplicant(applicant.id)}
                            size="large"
                            variant="outlined"
                            color="primary"
                            title="view"
                            startIcon={<VisibilityIcon />}
                          ></Button>
                          <Link to={`/applicant/edit/${applicant.id}`}>
                            <Button
                              size="large"
                              color="primary"
                              title="edit"
                              startIcon={<EditIcon />}
                            ></Button>
                          </Link>
                          <Button
                            onClick={() =>
                              handleClickOpen(applicant.id, applicant.firstName)
                            }
                            size="large"
                            variant="outlined"
                            color="error"
                            title="delete"
                            startIcon={<DeleteIcon />}
                          ></Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableBody>
                  );
                })}
            </Table>
            <Dialog
              sx={{ justifyContent: "center" }}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>
                <h2 style={{ textAlign: "center" }}>Do you want to Delete?</h2>
              </DialogTitle>
              <DialogContent>
                Are you sure you want to delete the applicant ?
              </DialogContent>
              <DialogActions>
                <Button sx={{ textAlign: "left" }} onClick={handleClose}>
                  Disagree
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteApplicant(storeId)}
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            {/* <Pagination
              siblingCount={1}
              boundaryCount={1}
              count={pageSize}
              onChange={handleChange}
              color="primary"
            /> */}
          </TableContainer>
        </>
      )}
    </div>
  );
}
export default ApplicantList;

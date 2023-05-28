import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { IconButton, Table ,TableCell,TableHead} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';


export default function ExperienceApplicantDetail({detail,onClick}){
    const detailObject= detail[0]
    console.log(detailObject,'hello')

    return(<>
        <TableContainer sx={{marginTop:1}} component={Paper}>
        <div style={{ display: 'flex',color:'red', border:'2px', justifyContent:'right'}}>
        <IconButton onClick={onClick}  sx={{right:0}} title='Cancel'>
            <CancelIcon/>
        </IconButton>
        </div>
            <Table>
                <TableHead>
                    <TableCell>ID</TableCell>
                    <TableCell>{detailObject.id}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>Company Name</TableCell>
                    <TableCell>{detailObject.CompanyName}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>Started Data</TableCell>
                    <TableCell>{detailObject.StartedDate}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>End Data</TableCell>
                    <TableCell>{detailObject.EndDate}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>Position</TableCell>
                    <TableCell>{detailObject.Position}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>Resposibilities</TableCell>
                    <TableCell>{detailObject.Responsibilities}</TableCell>
                </TableHead>
                <TableHead>
                    <TableCell>Certificates</TableCell>
                    <TableCell>{detailObject.Certificates}</TableCell>
                </TableHead>
            </Table>
        </TableContainer>
    </>  
    )
}
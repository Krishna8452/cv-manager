import React from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Dialog,
  IconButton
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import CancelIcon from "@mui/icons-material/Cancel";

const validationSchema = Yup.object().shape({
  position: Yup.string().required("Full Name is required")

});

export default function PositionFormComponent({ }) {
    const navigate= useNavigate()
    const [open, setOpen] = useState(true)
    const initialValues ={
        position:'',
      };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values,'jell')
    axios.post('http://localhost:3031/positions',values)
    navigate('/position')
     
  };


  return (
    <>  
       
        <Dialog open={open}>
        <Box sx={{display:'flex'}}>   
            <Typography sx={{ fontSize:50, marginLeft:'3rem'}}>Create Position</Typography>
            <Box sx={{flexGrow:1}}/>
            <Box
                style={{
                  border: "2px",
                  justifyContent: "right",
                }}
            >
                <IconButton color={"red"} onClick={()=>navigate('/position')} title="Cancel">
                  <CancelIcon />
                </IconButton>
            </Box>
        </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}

      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <Form style={{
              marginTop: "1rem",
              width:'20rem',
              marginLeft:'5rem',
              height:'10rem'
            }}>  
              <Grid>               
                  <Field
                    as={TextField}
                    width={"5rem"}
                    name="position"
                    label="position"
                    variant="outlined"
                    sx={{marginBottom:'1rem'}}
                    error={touched.position && !!errors.position}
                    helperText={touched.position && errors.position}           
                  />
              </Grid>
                  <Button variant="contained" size="large" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>          
            </Form>
        )}
      </Formik>
      </Dialog>
            
    </>
  );
}




import React from "react";
import {
  TextField,
  TableContainer,
  Grid,
  Button,
  Paper,
  Typography,
  Box
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  subject: Yup.string().required("Email is required"),
  body: Yup.string().required("Email is required"),

});

export default function TemplateLetterForm({ }) {
    const navigate= useNavigate()
    const [open, setOpen] = useState(true)
    const initialValues ={
        name:'',
        subject:'',
        body:''
      };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values,'jell')
    axios.post('http://localhost:3031/templateLetters',values)
    navigate('/templateLetter')
     
  };


  return (
    <>
        <TableContainer component={Paper}>
            <Typography sx={{ fontSize:50, textAlign:'center'}}>Fill up the Template Letter</Typography>
        </TableContainer>
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
              marginLeft:'10rem',
              justifyContent: "center",
              alignItems:'center',
              alignContent: "center",
              width:1200,
              height:800,
              gap:2
            }}>  
              <Grid>
                <Grid >
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Name"
                    variant="standard"
                    sx={{marginBottom:'1rem'}}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
            
                  />
                </Grid>
                <h2 style={{marginLeft:'orem'}}>Template</h2>
                <Box style={{border: '1px', borderRadius:2 }}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    as={TextField}
                    name="subject"
                    label="Subject"
                    sx={{marginBottom:'1rem'}}
                    type="subject"
                    variant="standard"
                    error={touched.subject && !!errors.subject}
                    helperText={touched.subject && errors.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
              
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="body"
                    label="Body"
                    sx={{marginBottom:'1rem'}}
                    type="body"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    error={touched.body && !!errors.body}
                    helperText={touched.body && errors.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
              
                  />
                </Grid>
                </Box>
              </Grid>

                  <Button variant="contained" size="large" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>          
            </Form>
        )}
      </Formik>
    </>
  );
}




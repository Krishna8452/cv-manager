import {React, useState, useEffect} from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TableContainer from "@mui/material/TableContainer";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  interviewerName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  //  position: Yup.string().required("Position is required"),
});

export default function FormComponent({ initialValues, onSubmit }) {
  console.log(initialValues, "final");
  const [list,setList] = useState()

  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3031/positions");
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
console.log(list,"p")
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
          <TableContainer
            sx={{
              marginTop: 1,
              justifyContent: "center",
              textAlign: "center",
              alignContent: "center",
              margin: "3rem,3rem,3rem,3rem",
              width:500,
              height:350
            }}
            component={Paper}
          >
            <Form>  
              <Grid
                sx={{
                  display: "grid",
                  //gridTemplateColumns: "repeat(1, 1fr)",
                  rowGap: "0px",
                  justifyContent:'center'
                  
                }}
              >
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="interviewerName"
                    label="Full Name"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.interviewerName && !!errors.interviewerName}
                    helperText={touched.interviewerName && errors.interviewerName}
            
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
              
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel id="position-label">Position</InputLabel>
                  <Field
                    as={Select}
                    labelId="position-label"
                    name="position"
                    variant="standard"
                    error={touched.position && !!errors.position}
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value= {values.position}
                  >
                    {list && list.length>0 && list.map((position) => (
                      <MenuItem key={position.id} value={position.position}>
                        {position.position}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.position && (
                    <ErrorMessage name="position" component="div" />
                  )}
                </Grid>


              </Grid>

                  <Button size="large" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>          
            </Form>
          </TableContainer>
        )}
      </Formik>
    </>
  );
}

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Checkbox,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  interviewerName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  position: Yup.string().required("Position is required"),
});

export default function FormComponent({ initialValues, onSubmit }) {
  console.log(initialValues, "final");

  const position = ["HR", "Junior", "Associate", "Senior"];

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
              marginRight: "10%",
              justifyContent: "center",
              textAlign: "center",
              alignContent: "center",
              backgroundColor: "#fcf5f5",
              margin: "3rem,3rem,3rem,3rem",
            }}
            component={Paper}
          >
            <Form>
              <Typography sx={{ textAlign: "center" }}>
                <h2>Fill up the form</h2>
              </Typography>
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
                  <InputLabel id="level-label">Position</InputLabel>
                  <Field
                    as={Select}
                    labelId="Position-label"
                    name="position"
                    variant="standard"
                    error={touched.position && !!errors.position}
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {position.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.level && (
                    <ErrorMessage name="level" component="div" />
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

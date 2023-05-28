import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Checkbox,
  ListItemText,
  Button,
  Typography,
  Input,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.number().required("Phone number is required"),
  level: Yup.string().required("Position is required"),
  reference: Yup.string().required("Reference is required"),
  technology: Yup.array().min(1, "At least one skill is required"),
  experience: Yup.string(),
  status: Yup.string().required("At least one skill is required"),
  salary_expectation: Yup.string().required("expected salary is required"),
  file: Yup.mixed().required("file is required"),
});

export default function FormComponent({ initialValues, onSubmit }) {
  console.log(initialValues, "final1");


  const level = ["Junior", "Associate", "Senior"];
  const technology = ["React", "Node.js", "JavaScript", "DotNet", "CSS"];
  const status = [
    "shortListed",
    "first interview",
    "second interview",
    "pending",
    "hired",
  ];
  return (
    <>
      <Formik
        initialValues={initialValues }
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
                  gridTemplateColumns: "repeat(3, 2fr)",
                  columnGap: "0px",
                }}
              >
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="firstName"
                    type="text"
                    label="First Name"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="middleName"
                    label="Middle Name"
                    type="text"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.middleName && !!errors.middleName}
                    helperText={touched.middleName && errors.middleName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="lastName"
                    type="text"
                    label="Last Name"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    label="Phone Number"
                    type="number"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="reference"
                    label="Reference"
                    type="text"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.reference && !!errors.reference}
                    helperText={touched.reference && errors.reference}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="salary_expectation"
                    label="Expected Salary"
                    type="text"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={
                      touched.salary_expectation && !!errors.salary_expectation
                    }
                    helperText={
                      touched.salary_expectation && errors.salary_expectation
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="experience"
                    label="Experience"
                    type="text"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.experience && !!errors.experience}
                    helperText={touched.experience && errors.experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="level-label">Level</InputLabel>
                  <Field
                    as={Select}
                    labelId="level-label"
                    name="level"
                    variant="standard"
                    error={touched.level && !!errors.level}
                    value={values.level}
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {level.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.level && (
                    <ErrorMessage name="level" component="div" />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="technologies-label">Technologies</InputLabel>
                  <Field
                    as={Select}
                    labelId="technologies-label"
                    name="technology"
                    multiple
                    variant="standard"
                    onChange={handleChange}
                    error={touched.technology && !!errors.technology}
                    onBlur={handleBlur}
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {technology.map((technology) => (
                      <MenuItem key={technology} value={technology}>
                        <Checkbox
                          checked={values.technology.includes(technology)}
                        />
                        <ListItemText primary={technology} />
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.technology && (
                    <ErrorMessage name="technologies" component="div" />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Field
                    as={Select}
                    labelId="status-label"
                    name="status"
                    variant="standard"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {status.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.status && (
                    <ErrorMessage name="status" component="div" />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="file"
                    label="Upload file"
                    variant="standard"
                    type="file"
                    sx={{ marginBottom: "16px", width: "20rem" }}
                    error={touched.file && !!errors.file}
                    helperText={touched.firstName && errors.file}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              <Grid
                sx={{
                  marginTop: "2rem",
                  alignItems: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Button size="large" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Grid>
            </Form>
          </TableContainer>
        )}
      </Formik>
    </>
  );
}

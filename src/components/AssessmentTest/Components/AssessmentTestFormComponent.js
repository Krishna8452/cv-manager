import React from 'react'
import * as Yup from "yup";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material";
  import {
    Formik,
    Field,
    Form,
    ErrorMessage,
  } from "formik";

const validationSchema = Yup.object().shape({
    applicant: Yup.string().required('please select at lease one interviewers'),
    title: Yup.string().required("Applicant is required"),
    evaluation: Yup.string().required("evaluation is required"),
    document: Yup.string().required("document is required"),
  });

export default function AssessmentTestFormComponent({initialValues,applicants, onSubmit}){
    const evaluation=["Very Poor","Poor","Average","Good","Very good"]
    console.log(initialValues,'k')
    console.log(applicants,'kk')

  return (
    <>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    enableReinitialize={true}
    >
    {({ errors, touched, values}) => (
        <Form style={{display:'grid', justifyContent:'center', textAlign:'center'}}>
              <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
                  <Field
                    as={TextField}
                    name="title"
                    type="text"
                    label="Title "
                    variant="standard"
                    sx={{ marginBottom: "16px" }}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                 
                  />
                </FormControl>
            <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
              <InputLabel id="applicant-label">Select Applicant</InputLabel>
              <Field
                as={Select}
                name="applicant"
                variant="standard"
                labelId="applicant-label"
                error={touched.applicant && !!errors.applicant}
              >
                {applicants.map((applicant) => (
                  <MenuItem key={applicant.id} value={applicant.id}>
                    {applicant.firstName} {applicant.lastName}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="applicant" component="div" />
            </FormControl>
            <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
            <InputLabel id="evaluation-label">evaluation</InputLabel>
                  <Field
                    as={Select}
                    labelId="evaluation-label"
                    name="evaluation"
                    variant="standard"
                    error={touched.evaluation && !!errors.evaluation}
                    value={values.evaluation}
                    sx={{ marginBottom: "16px", width: "20rem" }}
                  >
                    {evaluation.map((evaluation) => (
                      <MenuItem key={evaluation} value={evaluation}>
                        {evaluation}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.level && (
                    <ErrorMessage name="evaluation" component="div" />
                  )}
                </FormControl>
                <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
                    <Field type="file" id="document" name="document" />
                    <ErrorMessage name="document" component="div" />
                </FormControl>
                <Button variant='contained' size="large" type="submit">
                  Submit
                </Button>
         </Form>
        )}
    </Formik>
    </>
  )
}

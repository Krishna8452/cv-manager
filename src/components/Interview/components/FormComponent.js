import {React, useState} from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormikContext,
} from "formik";
import Dialog from "@mui/material/Dialog";


const validationSchema = Yup.object().shape({
  interviewers: Yup.array().min(1,'please select at lease one interviewers'),
  applicant: Yup.string().required("Applicant is required"),
  date: Yup.date().required("Datetime is required"),
});

export default function FormComponent({
  initialValues,
  onSubmit,
  interviewers,
  applicants,
}) {  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, Checkbox , ListItemText, values}) => (
       
        <Form style={{width:500, height:500,marginTop:40}}>
          <Grid
            sx={{
              display: "grid",
              rowGap: "0px",
              justifyContent: "center",
            }}
          >
            <InputLabel id="interviewers-label">Select Interviewers</InputLabel>

              <Field
                as={Select}
                name="interviewers"
                multiple
                labelId="interviewers-label"
                value={values.interviewers}
                variant="standard"
              >
              {interviewers.map((interviewer) => (
                <MenuItem key={interviewer.id} value={interviewer.id}>
                  {interviewer.interviewerName}
                </MenuItem>
              ))}
            </Field>


            <FormControl sx={{ marginBottom: "16px", width: "400px", marginTop:"10px" }}>
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
            <DatePickerField  name="date" label="Date" variant="standard" />
            <TimePickerField name="time" label="Time" variant="standard" />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  )};

function DatePickerField({ name, label }) {
  const { setFieldValue } = useFormikContext();

  return (
    <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
      <DatePicker
        sx={{width:'400px'}}
        name={name}
        variant="standard"
        label={label}
        renderInput={(props) => <TextField {...props} />}
        onChange={(date) => {
          setFieldValue(name, date);
        }}
      />
      <ErrorMessage name={name} component="div" />
    </FormControl>
  );
}

function TimePickerField({ name, label }) {
  const { setFieldValue } = useFormikContext();

  return (
    <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
      <TimePicker
       sx={{width:'400px'}}
        name={name}
        label={label}
        renderInput={(props) => <TextField {...props} />}
        onChange={(time) => {
          setFieldValue(name, time);
        }}
      />
      <ErrorMessage name={name} component="div" />
    </FormControl>
  );
}

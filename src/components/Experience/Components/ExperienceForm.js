import React from 'react';
import { TextField, Select, MenuItem, InputLabel, Grid, Box, Checkbox, ListItemText, Button, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.number().required('Phone number is required'),
  level: Yup.string().required('Department is required'),
  technology: Yup.array().min(1, 'At least one skill is required'),
  status: Yup.string().required('At least one skill is required'),
  salary_expectation: Yup.string().required('expected salary is required')


});

const ApplicantForm = () => {

  const level = ['Junior', 'Associate', 'Senior'];
  const technology = ['React', 'Node.js', 'JavaScript', 'DotNet', 'CSS'];
  const status = ['shortlisted', 'first interview', 'second interview', 'pending','hired'];
  
  function valuetext(value) {
    return `Rs : ${value}`;
  }

  const initialValues = {
    name:'',
    middleName:'',
    lastName: '',
    email: '',
    phone: '',
    level: '',
    technology:[],
    status:'',
    salary_expectation:''
  };

  const handleSubmit = (values, { setSubmitting }) => {
      localStorage.setItem('applicantList', JSON.stringify([values]))
  };

  return (
    <div>
      <TableContainer sx={{marginTop:1 ,textAlign:'center' }} component={Paper}>
        <h1>Create a Applicant form </h1>
      </TableContainer>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <TableContainer sx={{marginTop:1, marginRight:'10%', justifyContent:'center', textAlign:'center', alignContent:'center',backgroundColor:"#fcf5f5", margin:'5rem,5rem,5rem,5rem'}} component={Paper}>
           <Form>
            <Typography sx={{textAlign:'center'}}><h2>Fill up the form</h2></Typography>
           <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 2fr)', justifyContent:'space-around', columnGap:'20px'}}>
             <Grid item xs={12}>
               <Field
                 as={TextField}
                 name="name"
                 label="First Name"
                 variant='standard'
                 sx={{ marginBottom: '16px', width:'20rem' }}
                 error={touched.firstName && !!errors.firstName}
                 helperText={touched.firstName && errors.firstName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.firstName}
               />
             </Grid>
             <Grid item xs={12}>
               <Field
                 as={TextField}
                 name="middleName"
                 label="Middle Name"
                 variant='standard'
                 sx={{ marginBottom: '16px', width:'20rem' }}
                 error={touched.middleName && !!errors.middleName}
                 helperText={touched.middleName && errors.middleName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.middleName}
               />
             </Grid>
             <Grid item xs={12}>
               <Field
                 as={TextField}
                 name="lastName"
                 label="Last Name"
                 variant='standard'
                 sx={{ marginBottom: '16px', width:'20rem' }}
                 error={touched.lastName && !!errors.lastName}
                 helperText={touched.lastName && errors.lastName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.lastName}
               />
             </Grid>
             <Grid item xs={12}>
               <Field
                 as={TextField}
                 name="email"
                 label="Email"
                 type="email"
                 variant='standard'
                 sx={{ marginBottom: '16px', width:'20rem' }}
                 error={touched.email && !!errors.email}
                 helperText={touched.email && errors.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.email}
               />
             </Grid>
             <Grid item xs={12}>
               <Field
                as={TextField}
                name="phone"
                label="Phone Number"
                type="number"
                variant='standard'
                sx={{ marginBottom: '16px', width:'20rem' }}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
            </Grid>
            <Grid item xs={12}>
               <Field
                as={TextField}
                name="salary_expectation"
                label="Expected Salary"
                type="number"
                variant='standard'
                sx={{ marginBottom: '16px', width:'20rem' }}
                error={touched.expectedSalary && !!errors.expectedSalary}
                helperText={touched.expectedSalary && errors.expectedSalary}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expectedSalary}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="level-label">Level</InputLabel>
              <Field
                as={Select}
                labelId="level-label"
                name="level"
                variant='standard'
                error={touched.level && !!errors.level}
                value={values.level}
                sx={{ marginBottom: '16px',width:'20rem' }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {level.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Field>
              {touched.level && <ErrorMessage name="level" component="div" />}
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="technologies-label">Technologies</InputLabel>
              <Field
                as={Select}
                labelId="technologies-label"
                name="technology"
                multiple
                variant='standard'
                value={values.technology}
                onChange={handleChange}
                error={touched.technology && !!errors.technology}
                onBlur={handleBlur}
                sx={{ marginBottom: '16px', width:'20rem' }}
                renderValue={(selected) => selected.join(', ')}
              >
                {technology.map((technology) => (
                  <MenuItem key={technology} value={technology}>
                    <Checkbox checked={values.technology.includes(technology)} />
                    <ListItemText primary={technology} />
                  </MenuItem>
                ))}
              </Field>
              {touched.technologies && (
                <ErrorMessage name="technologies" component="div" />
              )}
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="status-label">Status</InputLabel>
              <Field
                as={Select}
                labelId="status-label"
                name="status"
                value={values.status}
                variant='standard'
                sx={{ marginBottom: '16px', width:'20rem' }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {status.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Field>
              {touched.status && <ErrorMessage name="status" component="div" />}
            </Grid>
          </Grid>
            <Grid sx={{marginTop:"2rem", alignItems:'center', textAlign:'center', alignItems:'center'}}>
              <Button size='large' type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Grid>
         
        </Form>
        </TableContainer>
        )}
      </Formik>
    </div>
  );
};

export default ApplicantForm;


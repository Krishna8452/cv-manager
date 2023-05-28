
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import  { React, useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  letterFile: Yup.mixed().required("Letter file is required"),
  editor:Yup.string().required('content is required')
});


const OfferLetterForm = () => {
const {id}= useParams()
const navigate =useNavigate()
  const [applicants, setApplicants] = useState([])

  useEffect(() => {

    axios.get("http://localhost:3031/applicants")
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
      });
  },[]);

  const handleSubmit = (values) => {
     console.log(values,'valuessss')
    if(id){
      axios.put(`http://localhost:3031/offerLetter/${id}`,values)
      navigate('/applicant')
   
    }else{
      axios.post('http://localhost:3031/offerLetter',values)
      navigate('/applicant')
    }
    console.log(values);
  };
  return (
    <>
      <TableContainer sx={{display:'flex', marginTop: 1 }} component={Paper}>
        <IconButton onClick={()=>navigate('/offerLetter')}>
          <ArrowBackIcon/>
        </IconButton>        
        <h1 style={{ marginLeft:'34%'}}>Fill up the form</h1>
      </TableContainer>
      <Formik
        initialValues={{
          status: "",
          letterFile: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="editor">Editor:</label>
            <Field name="editor">
              {({ field }) => (
                <JoditEditor
                  value={field.value}
                  onChange={(value) => field.onChange({ target: { name: field.name, value } })}
                  onBlur={() => field.onBlur(field.name)}
                />
              )}
            </Field>
            <ErrorMessage name="editor" component="div" />
          </div>

          <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
              <InputLabel id="applicant-label">Applicant</InputLabel>
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
            </FormControl><br/>
            
          <FormControl sx={{ marginBottom: "16px", width: "300px" }}>
            <label htmlFor="status">Status:</label>
            <Field type="text" id="status" name="status" />
            <ErrorMessage name="status" component="div" />
          </FormControl>


          <div>
            <label htmlFor="letterFile">Choose Letter File:</label>
            <Field type="file" id="letterFile" name="letterFile" />
            <ErrorMessage name="letterFile" component="div" />
          </div>

          <Button size="small" variant="contained" type="submit">Submit</Button>
        </Form>
)}
      </Formik>
    </>
  );
};

export default OfferLetterForm;

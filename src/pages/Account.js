import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../config/Theme';
import {Box} from '@mui/material';
import SideNav from '../Shared/Navigation/SideNav';
import Protected from '../authenticate/Protected';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Account = ({children}) => {

  return (
    <Protected>
    <React.Fragment>
    <ThemeProvider theme={theme}>                 
      <CssBaseline/>                                      
      <Box sx={styles.container}>  
        <SideNav/>
          <Box component={'main'} sx={styles.mainSection}>
            {children}
          </Box>
      </Box>                                         
    </ThemeProvider>
    </React.Fragment> 
    </Protected>
  );
};

const styles = {
  container:{
    display:'flex',
    bgcolor:'neutral.light',
    height: '100%',
  },
  mainSection:{
    p:1,
    width:"100%",
    height:"100%",
    overflow:'auto'
  }
}


export default Account;

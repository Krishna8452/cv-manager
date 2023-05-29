import React, { useCallback, useState } from 'react'
import { AppBar, IconButton, Toolbar, Box, Badge, Typography } from '@mui/material'
import { type } from '@testing-library/user-event/dist/type'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useProSidebar } from 'react-pro-sidebar';
import { UserAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import image from '../../constants/image';
import LoginIcon from '@mui/icons-material/Login';

export default function Header() {
    const { user, logOut } = UserAuth();
    const handleSignOut = async () => {
      try {
        await logOut()
        localStorage.clear('token')
      } catch (error) {
        console.log(error)
      }
    }

 const {collapseSidebar, toggleSidebar , broken } = useProSidebar()

  return (<AppBar position ="sticky" sx={styles.AppBar}> 
  <Toolbar>
        {user?(<IconButton   sx={{bg:'white'}} onClick={()=> broken? toggleSidebar():collapseSidebar()}>
        <MenuIcon/>
        </IconButton>):(null)}
        <Box
        component="img"
        sx={styles.appLogo}
        src={image.images3}/>

        <Box sx={{flexGrow:1}}/>

        {/* <IconButton title='Notificatios'>
            <Badge badgeContent={14} color="error">
                <NotificationsActiveIcon/>
            </Badge>
        </IconButton>

        <IconButton onClick={()=>console.log('clicked')} title='Setting'>
            <SettingsIcon/>
        </IconButton> */}
         { user ? (<Typography sx={{color:'black'}}>Welcome, {user?.displayName}</Typography>):null}
        { user ? (<IconButton onClick={handleSignOut} title='Logout'>
            <LogoutIcon/>
        </IconButton>) :(<Link to='/signin'> <LoginIcon/></Link> )}

    </Toolbar>
  </AppBar>)
}

    /** @type {import("@mui/material").SxProps} */
    const styles = {
        AppBar:{
            bgcolor:'#f44336',
            height:"4.5rem",
            justifyContent:'center'
        },
        appLogo:{
            borderRadius:0,
            width:163.5,
            height:"4.5rem",
            ml:2,
            cursor:'pointer'
        }
    }



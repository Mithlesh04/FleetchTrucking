import React from 'react';
import { makeStyles , Avatar , Menu , MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange } from '@material-ui/core/colors';

import fire from './fire'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom : 60,
  },
  Appbar : {
    background : '#ffffff',
    boxShadow : '0px 1px 9px -3px rgb(0 0 0 / 10%)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color : '#343a40'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function TopNav() {
  const classes = useStyles();
  const [userImg, setUserImg] = React.useState("https://source.unsplash.com/1600x900/?nature,water,earth");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getUserData,setUserData] = React.useState({})

  React.useEffect(()=>{
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        const todo = fire.database().ref('users/'+uid)
        todo.on('value',(d)=>{
           setUserData(d.val())
        })
        
      } else {
        setUserData({})
      }
    });
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOUT=_=>{
    fire.auth().signOut().then(() => {
      console.log('Sign-out successful.')
      handleClose()
    }).catch((error) => {
      console.log('An error happened. during signout  = ',error)
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.Appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fleetch Trucking
          </Typography>
             
            <IconButton onClick={handleClick}>
                <Avatar alt="Avatar" src={userImg} className={classes.orange} >G</Avatar>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>

              <Avatar alt="Avatar" src={userImg} style={{width:50,height:50}}>G</Avatar>
                <div style={{marginLeft : 30}}>{getUserData?.name}</div>
              </MenuItem>
              <MenuItem>{getUserData?.email}</MenuItem>
              <MenuItem>{getUserData?.password}</MenuItem>
              <MenuItem onClick={SignOUT} style={{marginLeft : 30,textAlign:'center'}}>Sign Out</MenuItem>
            </Menu>

        </Toolbar>
      </AppBar>
    </div>
  );
}

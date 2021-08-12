import React from 'react';
import { makeStyles,Avatar , Button,CssBaseline,TextField,Link,Paper,Grid,Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import fire from "./fire"



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,water,earth)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignIn(props) {
  const classes = useStyles();
  const [isSigninform,setIsSigninform] = React.useState(true)
  const [isError ,setError] = React.useState('')
  const [getuserdata,setInputData] = React.useState({
      name : '',
      email : '',
      password : '',
      isSigninform : isSigninform
  })

  
  const FormHandle = ({name,email,password,isSigninform})=>{
    var fireCheck
     if(isSigninform){
         fireCheck = fire.auth().signInWithEmailAndPassword(email, password)
     }else {
         fireCheck = fire.auth().createUserWithEmailAndPassword(email, password)
     }
 
     fireCheck.then((userCredential) => {
         var user = userCredential.user;
         fire.database().ref("users").child(user.uid).set({...(isSigninform ? {name} : {}),email,password})
         setInputData({
            name : '',
            email : '',
            password : '',
            isSigninform : isSigninform
        })
         props.userSingIn(user.uid)
         setError('')
         })
         .catch((error) => {
            setError(error.message)             
         });
 
  }
 
 
  const formSumbit = (e)=>{
        e.preventDefault()
        FormHandle(getuserdata)
  }

  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSigninform ? "Sign in" : "Sign up"}
          </Typography>
          <form className={classes.form} noValidate onSubmit={formSumbit}>
            {!isSigninform &&
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={e=>setInputData({...getuserdata,name : e.target.value})}
            />
            }

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e=>setInputData({...getuserdata,email : e.target.value})}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setInputData({...getuserdata,password : e.target.value})}
            />
            <Grid container justifyContent='center'>
                <span style={{color:'red'}}>{isError}</span>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSigninform ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={_=>setIsSigninform( !isSigninform)}>
                  { isSigninform ? "Don't have an account? Sign Up" : "have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
      
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
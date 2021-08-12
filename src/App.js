import React from 'react'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SignIn } from "./components/SignIn"
import TopNav from "./components/TopNav"
import WeightDetails from "./components/WeightDetails"
import WeightEntries from "./components/WeightEntries"
import fire from "./components/fire"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));
function App() {
  const classes = useStyles();
  const [isUserSignIn,setSignInUser] = React.useState(
    fire.auth().getUid()
   )
   React.useState(()=>{
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
         setSignInUser(uid)
      } else {
         setSignInUser()
      }
    })
   },[])
    
  return (
    <>
    <TopNav />

    { isUserSignIn ? <>
      <div className={classes.root}>
      <Grid container spacing={1} justifyContent="flex-start" >
          <WeightEntries />
        <Grid item xs={12} md={5} sm={12}>
          <WeightDetails />
        </Grid>
      </Grid>
    </div>
    <div className="row">
      <div className="col-3">
      
      </div>
    </div>
    </> : <SignIn userSingIn={setSignInUser} />}
    
    </>
  );
}

export default App;

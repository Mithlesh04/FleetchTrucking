import React from 'react';
import { makeStyles ,  createTheme ,  ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { green} from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import { Save , Update } from "./todo"

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign : 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
    //   height: theme.spacing(16),
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createTheme({
    palette: {
      primary: green,
    },
  });
export default function WeightDetails(props) {
  const classes = useStyles();
  const [weightData,setWeightData] = React.useState({
    currentWeight: props?.currentWeight || '' , targetWeight : props?.targetWeight || ''
  })
  const [__Msg__,set__Msg__] = React.useState('')
  const saveData = (key,val)=>{
    setWeightData({...weightData, [key] : val})
  }

  const submitData = ()=>{
    if(props?.isModal){
      Update(props.id,weightData,e=>{
        if(e){
          set__Msg__(e?.message)
        }else{
          props?.modal(false)
        }
      })
    }else {
      weightData.set__Msg__ = set__Msg__
      weightData.setWeightData = setWeightData
      Save(weightData)
    }

  }

  return (
  <Grid container maxwidth="sm" justifyContent="center">
    
      <div className={classes.root}>
         <Paper elevation={3}>
            <h2>{props?.title || "Weight Tracker"}</h2>
         <form className={classes.root} autoComplete="off">
        <div>
            <TextField
            required
            id="standard-multiline-flexible"
            label="Current Weight (kg)"
            type="number"
            className="form-control is-valid"
            value={weightData.currentWeight}
            onChange={e=>saveData("currentWeight",e.target.value)}
            />  
        </div>
        <div>
      <TextField
          required
          id="standard-multiline-flexible"
          label="Target Weight (kg)"
          type="number"
          className="form-control is-valid"
          value={weightData.targetWeight}
          onChange={e=>saveData('targetWeight',e.target.value)}
        />
      
      </div>
      </form>
     
           <Grid container justifyContent='center'>
                <span style={{color:'red'}}>{__Msg__}</span>
            </Grid>
            <ThemeProvider theme={theme}>
              <Button onClick={submitData} type="submit" variant="contained" color="primary" className={classes.margin}>
                {props?.button || "Submit"}
               </Button>
            </ThemeProvider>
            </Paper>
     </div>
      
   </Grid>
    );
}

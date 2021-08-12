import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Fetch, Delete } from "./todo"
import Grid from '@material-ui/core/Grid';

import WeightDetails from './WeightDetails'

const currentDate = (t) => {
  let m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Aug', 'Nov', 'Dec']
  let d = t ? new Date(t) : new Date()
  return d.getDate() + '-' + m[d.getMonth()] + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#87ceeb5c",
    color: "black",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }

}));



export default function WeightEntries() {
  const classes = useStyles();
  const [getEntries, setEntries] = React.useState()
  React.useEffect(() => {
    Fetch(setEntries)
  }, [])


  const [open, setOpen] = React.useState(false);
  const [getModalData,setModalData] = React.useState({})
  const handleOpen = (e) => {
    if(e){
      setModalData({ id : e[0], currentWeight:e[1]?.currentWeight, targetWeight:e[1]?.targetWeight })
    }
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  function TransitionsModal() {  
    let id=getModalData.id,currentWeight=getModalData.currentWeight,targetWeight=getModalData.targetWeight
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              {id && <WeightDetails isModal={true} modal={setOpen} id={id} currentWeight={Number(currentWeight)} targetWeight={Number(targetWeight)} button="Update" /> }
              {!id && "Something went wrong"}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  
  return ( (getEntries || '').length ? <Grid item xs={12} md={7} sm={12} style={{paddingTop : 13}}>
    <TableContainer component={Paper} className='scroll-bar' style={{ marginLeft: 10, maxHeight: (window.screen.height * 70) / 100 }}>
      {open && <TransitionsModal />}
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Current Weight&nbsp;(kg)</StyledTableCell>
            <StyledTableCell align="center">Target Weight&nbsp;(kg)</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(getEntries ? getEntries : []).map((e, i) => (
            <StyledTableRow key={i + e[0]} >
              <StyledTableCell component="th" scope="row">
                {i + 1}.
              </StyledTableCell>
              <StyledTableCell align="center" >{currentDate(e[1]?.Date)}</StyledTableCell>
              <StyledTableCell align="center">{e[1]?.currentWeight}</StyledTableCell>
              <StyledTableCell align="center">{e[1]?.targetWeight}</StyledTableCell>
              <StyledTableCell align="center">
                {/* e[0] */}
                <Edit color="primary" onClick={_=>handleOpen(e) } style={{ cursor: 'pointer', marginRight: 15 }} fontSize="small" />
                <DeleteIcon onClick={_ => Delete(e[0])} style={{ cursor: 'pointer', color: "#ff000094" }} fontSize="small" />

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> </Grid> : ''
  );
}

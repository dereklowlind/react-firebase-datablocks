import React, { useState, useEffect } from 'react'
import {Button, Dialog, DialogContent, DialogContentText, 
    DialogTitle, TextField, DialogActions} 
  from '@material-ui/core'
  import firebase from 'firebase'
/*
variables used
name string
state string
country string
*/

const datablockName = "MyCityExample";

function MyCityExample(props){
    // state variables
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // for updating
    const [openUpdateDataDialog, setOpenUpdateDataDialog] = useState(false);
    const [nameUpdateDataDialog, setNameUpdateDataDialog] = useState("");
    const [stateUpdateDataDialog, setStateUpdateDataDialog] = useState("");
    const [countryUpdateDataDialog, setCountryUpdateDataDialog] = useState("");
    // for deleting
    const [openDeleteDataDialog, setOpenDeleteDataDialog] = useState(false);



 //on component mount
 useEffect(() => {
    // // check that the db is being passed as a prop. show warning if it isn't
    // if(props.db  === undefined){ 
    //     return(
    //         <div>you need to pass the db to this element</div>
    //     )
    // }
  props.db.collection(`UserSpecificData/${firebase.auth().currentUser.uid}/MyData`).doc(datablockName).onSnapshot((doc) => {
      if(doc.data() !== undefined) { // check if data exists
        setName(doc.data().name);
        setState(doc.data().state);
        setCountry(doc.data().country);
        setNameUpdateDataDialog(doc.data().name);
        setStateUpdateDataDialog(doc.data().state);
        setCountryUpdateDataDialog(doc.data().country);
      }else{
        setName("");
        setState("");
        setCountry("");
        setNameUpdateDataDialog("");
        setStateUpdateDataDialog("");
        setCountryUpdateDataDialog("");
      }
  });
}, []);

    //request functions
    const handleUpdate = () => {
        props.db.collection(`UserSpecificData/${firebase.auth().currentUser.uid}/MyData`).doc(datablockName).set({
        datetime: new Date(),
        name: nameUpdateDataDialog,
        state: stateUpdateDataDialog,
        country: countryUpdateDataDialog
        })
        .then(function() {
            setOpenUpdateDataDialog(false);
            setNameUpdateDataDialog(name);
            setStateUpdateDataDialog(state);
            setCountryUpdateDataDialog(country);
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const handleDelete = () => {
      props.db.collection(`UserSpecificData/${firebase.auth().currentUser.uid}/MyData`).doc(datablockName).delete().then(function() {
        console.log(`Document ${datablockName} successfully deleted!`);
        setOpenDeleteDataDialog(false);
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

    //state sharing components seperated for clarity
  const updateDataDialog = (
    <Dialog open={openUpdateDataDialog} onClose={() => setOpenUpdateDataDialog(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update {datablockName} data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new {datablockName} data below
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="name"
          fullWidth
          value={nameUpdateDataDialog}
          placeholder="name"
          onChange={(e) => setNameUpdateDataDialog(e.target.value)}
        />
        <TextField
          margin="dense"
          id="state"
          label="state"
          fullWidth
          value={stateUpdateDataDialog}
          placeholder="state"
          onChange={(e) => setStateUpdateDataDialog(e.target.value)}
        />
        <TextField
          margin="dense"
          id="country"
          label="country"
          fullWidth
          value={countryUpdateDataDialog}
          placeholder="country"
          onChange={(e) => setCountryUpdateDataDialog(e.target.value)}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {
              setOpenUpdateDataDialog(false);
              setNameUpdateDataDialog(name);
              setStateUpdateDataDialog(state);
              setCountryUpdateDataDialog(country);
          }} color="primary">
              Cancel
        </Button>
        <Button 
          onClick={handleUpdate} 
          color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )

  const deleteDataDialog = (
    <Dialog open={openDeleteDataDialog} onClose={() => setOpenDeleteDataDialog(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update {datablockName} data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {datablockName} data
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {
              setOpenDeleteDataDialog(false);
          }} color="primary">
              Cancel
        </Button>
        <Button 
          onClick={handleDelete} 
          color="primary">
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  )

    return(
        <div>
            {updateDataDialog}
            {deleteDataDialog}
            <h1>{datablockName}</h1>
            <div>
              <div>Name: {name}</div>
              <div>State: {state}</div>
              <div>Country: {country}</div>
            </div>
            <Button variant="contained" onClick={() => setOpenUpdateDataDialog(true)}>Update {datablockName} data</Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDataDialog(true)}>Delete {datablockName} data</Button>
        </div>
        
    )
}
export default MyCityExample
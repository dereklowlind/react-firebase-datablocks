import React, { useState, useEffect } from 'react'
import {Button, Dialog, DialogContent, DialogContentText, 
    DialogTitle, TextField, DialogActions} 
  from '@material-ui/core'
import { BorderColor } from '@material-ui/icons';
/*
variables used
name string
state string
country string
*/

const datablockName = "MultipleCitiesExample";

function MultipleCitiesExample(props){
    // list state variable
    const [dataList, setDataList] = useState([]);
    // for adding
    const [openAddDataDialog, setOpenAddDataDialog] = useState(false);
    const [nameAddDataDialog, setNameAddDataDialog] = useState("");
    const [stateAddDataDialog, setStateAddDataDialog] = useState("");
    const [countryAddDataDialog, setCountryAddDataDialog] = useState("");
    // for updating
    const [openUpdateDataDialog, setOpenUpdateDataDialog] = useState(false);
    const [docIdUpdateDataDialog, setDocIdUpdateDataDialog] = useState("");
    const [nameUpdateDataDialog, setNameUpdateDataDialog] = useState("");
    const [stateUpdateDataDialog, setStateUpdateDataDialog] = useState("");
    const [countryUpdateDataDialog, setCountryUpdateDataDialog] = useState("");
    // for deleting
    const [openDeleteDataDialog, setOpenDeleteDataDialog] = useState(false);
    const [docIdDeleteDataDialog, setDocIdDeleteDataDialog] = useState("");



 //on component mount
 useEffect(() => {
    // // check that the db is being passed as a prop. show warning if it isn't
    // if(props.db  === undefined){ 
    //     return(
    //         <div>you need to pass the db to this element</div>
    //     )
    // }
  props.db.collection(`GeneralData/Lists/${datablockName}`).onSnapshot((dataEntries) => {
    let rows = []
    dataEntries.forEach(doc => {
      rows.push({
        docId: doc.id,
        name: doc.data().name,
        state: doc.data().state,
        country: doc.data().country
      })
    })
    setDataList(rows);
  });
}, []);

    //request functions
    const handleAdd = () => {
        props.db.collection(`GeneralData/Lists/${datablockName}`).add({
        datetime: new Date(),
        name: nameAddDataDialog,
        state: stateAddDataDialog,
        country: countryAddDataDialog
        })
        .then(function() {
            setOpenAddDataDialog(false);
            setNameAddDataDialog("");
            setStateAddDataDialog("");
            setCountryAddDataDialog("");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const handleUpdate = () => {
        props.db.collection(`GeneralData/Lists/${datablockName}`).doc(docIdUpdateDataDialog).set({
            datetime: new Date(),
            name: nameUpdateDataDialog,
            state: stateUpdateDataDialog,
            country: countryUpdateDataDialog
        })
        .then(function() {
            setOpenUpdateDataDialog(false);
            setDocIdUpdateDataDialog("");
            setNameUpdateDataDialog("");
            setStateUpdateDataDialog("");
            setCountryUpdateDataDialog("");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const handleDelete = () => {
      props.db.collection(`GeneralData/Lists/${datablockName}`).doc(docIdDeleteDataDialog).delete().then(function() {
        console.log(`Document ${datablockName} successfully deleted!`);
        setOpenDeleteDataDialog(false);
        setDocIdDeleteDataDialog("");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

    //state sharing components seperated for clarity
    const addDataDialog = (
        <Dialog open={openAddDataDialog} onClose={() => setOpenAddDataDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add {datablockName} data</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the new {datablockName} data below
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="name"
              fullWidth
              value={nameAddDataDialog}
              placeholder="name"
              onChange={(e) => setNameAddDataDialog(e.target.value)}
            />
            <TextField
              margin="dense"
              id="state"
              label="state"
              fullWidth
              value={stateAddDataDialog}
              placeholder="state"
              onChange={(e) => setStateAddDataDialog(e.target.value)}
            />
            <TextField
              margin="dense"
              id="country"
              label="country"
              fullWidth
              value={countryAddDataDialog}
              placeholder="country"
              onChange={(e) => setCountryAddDataDialog(e.target.value)}
            />
    
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => {
                  setOpenAddDataDialog(false);
                  setNameAddDataDialog("");
                  setStateAddDataDialog("");
                  setCountryAddDataDialog("");
              }} color="primary">
                  Cancel
            </Button>
            <Button 
              onClick={handleAdd} 
              color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )

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
              setDocIdUpdateDataDialog("");
              setNameUpdateDataDialog("");
              setStateUpdateDataDialog("");
              setCountryUpdateDataDialog("");
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
              setDocIdDeleteDataDialog("");
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
            {addDataDialog}
            {updateDataDialog}
            {deleteDataDialog}
            <h1>{datablockName}</h1>
            <Button variant="contained" color="primary" onClick={() => setOpenAddDataDialog(true)}>Add {datablockName} list entry</Button>

            {dataList.map((listItem) => (
                <div key={listItem.docId} >
                    <div>Name: {listItem.name}</div>
                    <div>State: {listItem.state}</div>
                    <div>Country: {listItem.country}</div>
                    <Button variant="contained" onClick={() => {
                        setOpenUpdateDataDialog(true);
                        setDocIdUpdateDataDialog(listItem.docId);
                        setNameUpdateDataDialog(listItem.name);
                        setStateUpdateDataDialog(listItem.state);
                        setCountryUpdateDataDialog(listItem.country);
                    }}>Update this entry</Button>
                    <Button variant="contained" color="secondary" onClick={() => {
                        setOpenDeleteDataDialog(true);
                        setDocIdDeleteDataDialog(listItem.docId);
                    }}>Delete this entry</Button> 
                </div>
        ))}


            {/* <div>
              <div>Name: {name}</div>
              <div>State: {state}</div>
              <div>Country: {country}</div>
            </div>
            <Button variant="contained" onClick={() => setOpenUpdateDataDialog(true)}>Update {datablockName} data</Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDataDialog(true)}>Delete {datablockName} data</Button> */}
        </div>
        
    )
}
export default MultipleCitiesExample
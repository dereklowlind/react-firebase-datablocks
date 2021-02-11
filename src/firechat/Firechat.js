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

const datablockName = "Firechat";
const roomId = "0";
function Firechat(props){
    // list state variable
    const [dataList, setDataList] = useState([]);
    // for sending message
    const [messageToSend, setMessageToSend] = useState("");




 //on component mount
 useEffect(() => {
    // // check that the db is being passed as a prop. show warning if it isn't
    // if(props.db  === undefined){ 
    //     return(
    //         <div>you need to pass the db to this element</div>
    //     )
    // }
  props.db.collection(`messaging/room-message/${roomId}`).orderBy("timestamp").onSnapshot((dataEntries) => {
    let rows = []
    dataEntries.forEach(doc => {
      rows.push({
        docId: doc.id,
        // userId:
        // name:
        message: doc.data().message,
        timestamp: doc.data().timestamp
      })
    })
    setDataList(rows);
  });
}, []);

    //request functions
    const handleSend = (e) => {
      e.preventDefault();
        props.db.collection(`messaging/room-message/${roomId}`).add({
          // userId:
          // name:
          message: messageToSend,
          timestamp: new Date(),
        })
        .then(function() {
            setMessageToSend("");
        })
        .catch(function(error) {
            console.error("Error sending message: ", error);
        });
    }





    return(
        <div>

            <h1>{datablockName}</h1>
            {dataList.map((listItem) => (
                <div key={listItem.docId} >
                    <div>{listItem.message}</div>
                </div>
            ))}
            <form onSubmit={handleSend} className="sendMessageForm">
              <TextField
                margin="dense"
                id="messageToSend"
                // fullWidth
                value={messageToSend}
                placeholder="Aa"
                onChange={(e) => setMessageToSend(e.target.value)}
              />
              <Button type="submit" color="primary">
                Send
              </Button>
            </form>

        </div>       
    )
}
export default Firechat
import React, { useState } from 'react';
import SingleCityExample from '../datablocks/generalData/SingleCityExample';
import MultipleCitiesExample from '../datablocks/generalData/MultipleCitiesExample';
import MyCityExample from '../datablocks/userSpecificData/MyCityExample';
import Firechat from '../firechat/Firechat';

function Mainpage(props){
  const db = props.db;

  let userSpecificDataBlocks = (
    <h1>Sign in to use user specific data blocks</h1>
  )
  if(props.isSignedIn){
    userSpecificDataBlocks = (
      <MyCityExample db={db} />
      
    )
  }
    return(
      <div>
        <div>main page</div>
        {/* <SingleCityExample db={db}/>
        <MultipleCitiesExample db={db} /> */}
        <Firechat db={db} />
        {userSpecificDataBlocks}
      </div> 
    )
}
export default Mainpage

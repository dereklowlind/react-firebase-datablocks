import React, { useState } from 'react';
import SingleCityExample from '../datablocks/generalData/SingleCityExample';
function Mainpage(props){
  const db = props.db;
    return(
      <div>
        <div>main page</div>
        <SingleCityExample db={db}/>
      </div> 
    )
}
export default Mainpage

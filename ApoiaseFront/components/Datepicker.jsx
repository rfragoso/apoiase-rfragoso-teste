import React from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default function Datepicker(props) {
  //alert("readonly: " + props.readonly);
  if(props.readonly == true)
  {
    return <>Data: {props.value}</>}
  else{
    return <MyDTPicker value={props.value}  />
  }
}

function renderInput(props) {
  /*
  function clear() {
    props.onChange({ target: { value: "" } } );
  }
  */
  return (
    <div>
      <input {...props} />
      
    </div>
  );
}
const MyDTPicker = (props) => {  
    return <Datetime value={props.value} renderInput={renderInput} />; 
  
}
import React from 'react';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';
import {
  Container, LabelForm, InputForm, TextareaForm,
} from './style/sharedstyles';

export default function Datepicker(props) {
  // alert("readonly: " + props.readonly);
  // alert("onChangePostDateTime 1" + props);

  if (props.readonly == true) {
    return (
      <>
        Data:
        {props.value}
      </>
    );
  }

  return <MyDTPicker value={props.value} />;
}

function setDate(date) {
  console.log('setDate');
  props.onChange(date);
}

function renderInput(props) {
  return (
    <div>
      <input {...props} />

    </div>
  );
}
function MyDTPicker(props) {
  return <Datetime value={props.value} renderInput={renderInput} onChange={props.onChange} />;
  // (date) => props.onChange(date)
}

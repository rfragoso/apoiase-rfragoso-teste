import React from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default function Datepicker() {
  return <MyDTPicker />;
}

class MyDTPicker extends React.Component {
  render() {
    return <Datetime renderInput={this.renderInput} />;
  }
  renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: "" } } );
    }
    return (
      <div>
        <input {...props} />
        
      </div>
    );
  }
}
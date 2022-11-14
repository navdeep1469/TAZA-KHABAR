import React, { Component } from "react";
import loading from './Spinner-1s-50px.gif'
export class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="" />
      </div>
    );
  }
}

export default Loader;

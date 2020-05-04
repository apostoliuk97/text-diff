import React, { Component } from "react";

export class Tets extends Component {

  // shouldComponentUpdate() {
  //   console.log('should')
  //   return false;
  // }

  componentDidUpdate() {
    console.log('update');
  }
  render() {
    return (<div>Test</div>);
  }
}
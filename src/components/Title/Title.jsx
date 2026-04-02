import React, { Component } from "react";

export class Title extends Component {
  render() {
    const { text } = this.props;
    return <h2>{text}</h2>;
  }
}

import React, { Component } from 'react';

class Detalhe extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>{this.props.dadosPrevisao.summary + " " + this.props.dadosPrevisao.temperatureC}</div>
    );
  }
}

export default Detalhe;
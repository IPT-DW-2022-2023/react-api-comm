import React, { Component } from 'react';


class Lista extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let listaLis = [];

    this.props.lista.forEach(element =>
      listaLis.push(<li class="list-group-item"
        onClick={() => this.props.buscarDetalhes(element.id)}>{element.date.substr(0, 10)}
      </li>)
    );


    return (
      <div class="row">
        <h4>Olá Weather</h4>
        <div class="col-6">
          <ul class="list-group">
            {listaLis}
          </ul>
        </div>

        <div class="col-6">
        </div>
      </div>
    );
  }
}

export default Lista;
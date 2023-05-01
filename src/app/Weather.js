import React, { Component } from 'react';

class Weather extends Component {
  state = { listaWeather: [], dadosWeather: null }

  componentDidMount() {
    this.buscarDadosIniciais();
    this.criarDados();
  }

  buscarDadosIniciais() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://localhost:7261/weatherforecast", requestOptions)
      .then(res => res.json())
      .then(result => this.setState({ listaWeather: result }))
      .catch(error => console.log('error', error));
  }

  buscarDetalhes(id) {
    fetch("https://localhost:7261/weatherforecast/" + id)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  

  render() {
    let listaLis = [];

    this.state.listaWeather.forEach(element =>
      listaLis.push(<li class="list-group-item" onClick={() => this.buscarDetalhes(element.id)}>{element.date.substr(0, 10)}</li>)
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

export default Weather;
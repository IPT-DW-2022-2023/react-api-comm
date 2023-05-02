import React, { Component } from 'react';
import Lista from './Lista';
import Detalhe from './Detalhe';

class Weather extends Component {
  state = { listaWeather: [], dadosWeather: null }

  async componentDidMount() {
    this.buscarDadosIniciais();
  }

  async buscarDadosIniciais() {
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
      .then(result => this.setState({ dadosWeather: result }))
      .catch(error => console.log('error', error));
  }

  async criarPrevisao() {
    let obj = {Date: new Date().toJSON(), TemperatureC:20, Summary: "Descrição genérica"};

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
    };

    fetch("https://localhost:7261/weatherforecast/create", requestOptions)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }



  render() {
    if (this.state.dadosWeather === null) {
      return (
        <Lista lista={this.state.listaWeather}
          buscarDetalhes={(id) => { this.buscarDetalhes(id) }}
        />
      );
    }else{
      return <Detalhe dadosPrevisao={this.state.dadosWeather}/>;
    }


  }
}

export default Weather;
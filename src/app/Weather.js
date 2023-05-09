import React, { Component } from 'react';
import Lista from './Lista';
import Detalhe from './Detalhe';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Weather extends Component {
  state = { listaWeather: [], dadosWeather: null, startDate: new Date() }

  async componentDidMount() {
    // this.removerPrevisao(1);
    // this.atualizarPrevisao(5);
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
      .catch(error => { console.log('error', error) });
  }

  buscarDetalhes(id) {
    fetch("https://localhost:7261/weatherforecast/" + id)
      .then(res => res.json())
      .then(result => this.setState({ dadosWeather: result }))
      .catch(error => console.log('error', error));
  }

  async criarPrevisao() {
    let obj = { Date: this.state.startDate.toJSON(), TemperatureC: 20, Summary: "Descrição genérica" };

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

  async atualizarPrevisao(id) {
    let obj = { Date: new Date().toJSON(), TemperatureC: -20, Summary: "fRIO", Id: id };

    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
    };

    fetch("https://localhost:7261/weatherforecast/update", requestOptions)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async removerPrevisao(id) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch("https://localhost:7261/weatherforecast/delete/" + id, requestOptions)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  render() {
    if (this.state.dadosWeather === null) {
      return (
        <>
          <Lista lista={this.state.listaWeather}
            buscarDetalhes={(id) => { this.buscarDetalhes(id) }}
          />
          <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
        </>
      );
    } else {
      return <Detalhe dadosPrevisao={this.state.dadosWeather} />;
    }


  }
}

export default Weather;
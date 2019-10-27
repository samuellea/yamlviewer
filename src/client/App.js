import React, { Component } from 'react';
import './app.css';
import * as api from './api';
import Result from './Result';

export default class App extends Component {
  state = {
    url: '',
    result: null,
    error: null,
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      url: value
    })
  }

  handleClick = () => {
    const { url } = this.state;
    api.getGithubFile(url).then(res => {
      this.setState({
        result: res,
        error: null
      });
    }).catch(err => {
      this.setState({
        error: err
      });
    })
  }

  render() {
    const { result, error } = this.state;
    return (
      <div className="App">
        <div className="input">
          <input type="text" placeholder="Enter the URL of a .YAML file from Github" onChange={this.handleChange} />
          <button type="button" onClick={this.handleClick}>
            Go
            </button>
        </div>
        <div className="output">
          <Result result={result} error={error} />
        </div>
      </div>
    );
  }
}

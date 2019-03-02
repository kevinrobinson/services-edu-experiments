import React, { Component } from 'react';
import {readApiKeyFromWindow, readDomainFromEnv} from '../config.js';
import './SendText.css';

export default class SendText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      message: '',
      error: null,
      json: null,
      apiKey: readApiKeyFromWindow()
    };

    this.onNumberChanged = this.onNumberChanged.bind(this);
    this.onMessageChanged = this.onMessageChanged.bind(this);
    this.onSendClicked = this.onSendClicked.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  sendText() {
    const {number, message, apiKey} = this.state;
    const domain = readDomainFromEnv();
    const headers = {
      'X-Services-Edu-Api-Key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const url = `${domain}/texts/send`;
    const body = JSON.stringify({number, message});
    fetch(url, {headers, body, method: 'POST'})
      .then(response => response.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onNumberChanged(e) {
    const number = e.target.value;
    this.setState({number});
  }

  onMessageChanged(e) {
    const message = e.target.value;
    this.setState({message});
  }

  onSendClicked() {
    this.sendText();
  }

  onFetchDone(json) {
    this.setState({json});
  }

  onFetchError(error) {
    this.setState({error});
  }

  render() {
    const {apiKey} = this.state;

    return (
      <div className="SendText">
        <header className="SendText-header">
          {!apiKey ? this.renderMissingApiKey() : this.renderSearch()}
        </header>
      </div>
    );
  }

  renderMissingApiKey() {
    return (
      <div>
        <div>You need an API key to get started.</div>
        <div>When you get one, add it to the URL like `/texts/send?api_key=abc`</div>
      </div>
    );
  }

  renderSearch() {
    const {error, json, number, message} = this.state;
    return (
      <div>
        <div>number: <input placeholder="+15551234567" autoFocus={true} onChange={this.onNumberChanged} type="text" value={number} /></div>
        <div>message: <input onChange={this.onMessageChanged} type="text" value={message} /></div>
        <div><button disabled={message === '' || number === ''} onClick={this.onSendClicked}>send</button></div>
        {json && this.renderJson(json)}
        {error && <div>error: {JSON.stringify(error, null, 2)}</div>}
      </div>
    );
  }

  renderJson(json) {
    return <pre>{JSON.stringify(json, null, 2)}</pre>;
  }
}

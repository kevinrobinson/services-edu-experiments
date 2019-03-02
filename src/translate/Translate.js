import React, { Component } from 'react';
import _ from 'lodash';
import {readApiKeyFromWindow, readDomainFromEnv} from '../config.js';
import './Translate.css';

export default class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      language: 'ht',
      code: '',
      error: null,
      json: null,
      apiKey: readApiKeyFromWindow()
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onTranslate = this.onTranslate.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.debouncedFetch = _.debounce(this.debouncedFetch, 100);
  }

  debouncedFetch() {
    const {query, code, language, apiKey} = this.state;
    const domain = readDomainFromEnv();
    const headers = {'X-Services-Edu-Api-Key': apiKey};
    const codeToUse = code || language;
    const url = `${domain}/languages/translate?language=${encodeURIComponent(codeToUse)}&text=${encodeURIComponent(query)}`;
    fetch(url, {headers})
      .then(response => response.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onQueryChange(e) {
    const query = e.target.value;
    this.setState({query});
  }

  onLanguageChange(e) {
    const language = e.target.value;
    this.setState({language});
  }

  onCodeChange(e) {
    const code = e.target.value;
    this.setState({code});
  }

  onTranslate() {
    this.debouncedFetch();
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
      <div className="Translate">
        <header className="Translate-header">
          {!apiKey ? this.renderMissingApiKey() : this.renderInput()}
        </header>
      </div>
    );
  }

  renderMissingApiKey() {
    return (
      <div>
        <div>You need an API key to get started.</div>
        <div>When you get one, add it to the URL like `/translate?api_key=abc`</div>
      </div>
    );
  }

  renderInput() {
    const {error, json, query, language, code} = this.state;
    return (
      <div>
        <div className="Translate-text">
          <div>Type something in any language!</div>
          <input
            autoFocus={true}
            className="Translate-text-input"
            onChange={this.onQueryChange}
            type="text"
            value={query}
          />
        </div>
        <div className="Translate-language">
          <div>Translate it into another language</div>
          <div>Pick one or use any <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">two-letter code</a>:</div>
          <select 
            disabled={code !== ''}
            onChange={this.onLanguageChange}
            value={language}>
            <option value="ht">Kreyòl Ayisyen</option>
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="hi">हिन्दी, हिंदी</option>
          </select>
          <input
            className="Translate-language-code"
            onChange={this.onCodeChange}
            type="text"
            value={code}
          />
        </div>
        <button onClick={this.onTranslate}>translate!</button>
        {json && this.renderJson(json)}
        {error && <div>error: {JSON.stringify(error, null, 2)}</div>}
      </div>
    );
  }

  renderJson(json) {
    return (
      <div className="Translate-translated">
        {json.data.translations[0].translatedText}
      </div>
    );
  }
}

import React, { Component } from 'react';
import _ from 'lodash';
import {readApiKeyFromWindow, readDomainFromEnv} from '../config.js';
import './ImageSearch.css';

export default class ImageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: null,
      json: null,
      apiKey: readApiKeyFromWindow()
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.debouncedFetch = _.debounce(this.debouncedFetch, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.apiKey && prevState.query !== this.state.query && this.state.query !== '') {
      this.debouncedFetch();
    }
  }

  debouncedFetch() {
    const {query, apiKey} = this.state;
    const domain = readDomainFromEnv();
    const headers = {'X-Services-Edu-Api-Key': apiKey};
    const url = `${domain}/images/search?q=${encodeURIComponent(query)}`;
    fetch(url, {headers})
      .then(response => response.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onQueryChange(e) {
    const query = e.target.value;
    this.setState({query});
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
      <div className="ImageSearch">
        <header className="ImageSearch-header">
          {!apiKey ? this.renderMissingApiKey() : this.renderSearch()}
        </header>
      </div>
    );
  }

  renderMissingApiKey() {
    return (
      <div>
        <div>You need an API key to get started.</div>
        <div>When you get one, add it to the URL like `/images?api_key=abc`</div>
      </div>
    );
  }

  renderSearch() {
    const {error, json, query} = this.state;
    return (
      <div>
        <div>search images: <input autoFocus={true} onChange={this.onQueryChange} type="text" value={query} /></div>
        {json && this.renderJson(json)}
        {error && <div>error: {JSON.stringify(error, null, 2)}</div>}
      </div>
    );
  }

  renderJson(json) {
    return (
      <div>
        {json.items.map(item => (
          <div className="ImageSearch-image" key={item.link}>
            <img
              src={item.image.thumbnailLink}
              alt={item.title}
              width={item.image.thumbnailWidth}
              height={item.image.thumbnailHeight}
            />
            <div className="ImageSearch-image-source">
              <span>from </span>
              <a className="ImageSearch-image-link" href={item.image.contextLink} target="_blank" rel="noopener noreferrer">{item.displayLink}</a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

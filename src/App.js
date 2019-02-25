import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ImageSearch from './images/ImageSearch';
import VideoSearch from './videos/VideoSearch';
import SendTexts from './texts/SendText';
import './App.css';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={() => this.renderHello()} />
          <Route exact path="/images" render={() => this.renderImages()} />
          <Route exact path="/videos" render={() => this.renderVideos()} />
          <Route exact path="/texts/send" render={() => this.renderSendTexts()} />
        </div>
      </BrowserRouter>
    );
  }

  renderHello() {
    return (
      <div>
        <div>services-edu-experiments</div>
        <div><a href="/images">images</a></div>
        <div><a href="/videos">videos</a></div>
        <div><a href="/texts/send">send texts</a></div>
      </div>
    );
  }

  renderImages() {
    return <ImageSearch />;
  }

  renderVideos() {
    return <VideoSearch />;
  }

  renderSendTexts() {
    return <SendTexts />;
  }
}
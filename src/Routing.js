import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ImageSearch from './images/ImageSearch';
import VideoSearch from './videos/VideoSearch';
import SendTexts from './texts/SendText';
import Translate from './translate/Translate';


export default class Routing extends Component {
  render() {
    const {user, signInWithGoogle, signOut} = this.props;

    if (!user) {
      return (
        <div>
          <span>hello there!</span>
          <span><button onClick={signInWithGoogle}>sign in</button></span>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>hello, {user.displayName}!</span>
            <span>
              <span>{user.email}</span>
              <button onClick={signOut}>sign out</button>
            </span>
          </div>
          <Route exact path="/" render={() => this.renderHello()} />
          <Route exact path="/images" render={() => this.renderImages()} />
          <Route exact path="/videos" render={() => this.renderVideos()} />
          <Route exact path="/texts/send" render={() => this.renderSendTexts()} />
          <Route exact path="/translate" render={() => this.renderTranslate()} />
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
        <div><a href="/translate">translations</a></div>
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

  renderTranslate() {
    return <Translate />;
  }
}
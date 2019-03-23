import React, { Component } from "react";
import "./App.sass";
import tumblrLogo from "./assets/TUMBLR.svg";
import twitterLogo from "./assets/TWITTER.svg";
import quotesLogo from "./assets/QUOTE.svg";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: "Quality means doing it right when no one is looking.",
      quoteSignature: "Henry Ford",
      counter: 1,
      API: false,
      currentStyling: ["orange-styling", "red-styling", "blue-styling"],
      currentStylingIndex: 0
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  async componentDidMount() {
    let quotes = await axios.get(
      "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback="
    );
    quotes = quotes.data;
    this.setState({ quotesBase: quotes });
    console.log(this.state);
    console.log(this.state.quotesBase.length);
  }
  handleButtonClick() {
    let nxtQuote = this.state.quotesBase[this.state.counter];
    this.setState({
      API: true,
      quoteText: nxtQuote.content,
      quoteSignature: nxtQuote.title,
      counter: (this.state.counter + 1) % this.state.quotesBase.length,
      currentStylingIndex:
        (this.state.currentStylingIndex + 1) % this.state.currentStyling.length
    });
  }
  render() {
    return this.state.API ? (
      <div
        id="quote-box"
        className={`App ${
          this.state.currentStyling[this.state.currentStylingIndex]
        }`}
      >
        <div className="App__quote">
          <div className="App__top">
            <div id="text" className="App__txt-svg">
              <div className="App__top__svg">
                <img src={quotesLogo} alt="quotes icon" />
              </div>
              {this.state.quoteText}
            </div>
            <div id="author" className="App__quote__signature">
              - {this.state.quoteSignature}
            </div>
          </div>
          <div className="App__bottom">
            <div className="App__logos">
              <div className="App__bottom__svg">
                <img src={tumblrLogo} alt="tumblr icon" />
              </div>
              <div className="App__bottom__svg">
                <a
                  id="tweet-quote"
                  href="twitter.com/intent/tweet"
                  className="App__bottom__svg"
                >
                  <img src={twitterLogo} alt="twitter icon" />
                </a>
              </div>
            </div>
            <div className="App__newQuoteBtn">
              <button
                id="new-quote"
                className={`${
                  this.state.currentStyling[this.state.currentStylingIndex]
                }`}
                onClick={this.handleButtonClick}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className={`App ${
          this.state.currentStyling[this.state.currentStylingIndex]
        }`}
      >
        <div id="quote-box" className="App__quote">
          <div className="App__top">
            <div className="App__txt-svg">
              <div className="App__top__svg">
                <img src={quotesLogo} alt="quotes icon" />
              </div>
              <div id="text" className="App__quote__text">
                {this.state.quoteText}
              </div>
            </div>
            <div id="author" className="App__quote__signature">
              - {this.state.quoteSignature}
            </div>
          </div>
          <div className="App__bottom">
            <div className="App__logos">
              <img src={tumblrLogo} alt="tumblr icon" />
              <a
                id="tweet-quote"
                href="twitter.com/intent/tweet"
                className="App__bottom__svg"
              >
                <img src={twitterLogo} alt="twitter icon" />
              </a>
            </div>
            <div className="App__newQuoteBtn">
              <button
                id="new-quote"
                className={`${
                  this.state.currentStyling[this.state.currentStylingIndex]
                }`}
                onClick={this.handleButtonClick}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

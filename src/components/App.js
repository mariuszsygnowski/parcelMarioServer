import React from "react";
import Header from "./Header";
import Form from "./Form";
import Intro from "./Intro";
import Results from "./Results";
import "../styles/components/app.scss";

// import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultsArray: [],
      arrayOfPrices: []
    };

    this.handleResults = this.handleResults.bind(this);
  }

  handleResults(array) {
    this.setState({
      resultsArray: array
    });
  }

  render() {
    return (
      <div className={"app"}>
        <Header />
        <Intro />
        <Form array={this.handleResults} />
        <Results arrayOfResults={this.state.resultsArray} />
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;

import React from 'react';
import CurrentStock from './CurrentStock';
import Header from './Header';
import TotalPrice from './TotalPrice'

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: [],
      deliveryCharge: 0,
      currentBasket: [],
      deliveryAddress: '',
      basketTotal: 0
    }

    this.basketItem = this.basketItem.bind(this);
    this.runFetch = this.runFetch.bind(this);
    this.clearBasket = this.clearBasket.bind(this);
    this.deliveryCharge = this.deliveryCharge.bind(this);
    this.addressSet = this.addressSet.bind(this);

  }

  runFetch() {
    fetch('/menu')
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        // console.log(body);
        this.setState({
          menuItems: body
        })
      });
  }

  basketItem(item) {
    this.setState({
      currentBasket: this.state.currentBasket.concat([item]),
      basketTotal: this.state.basketTotal + (Number(item.price))
    });
  };

  clearBasket() {
    this.setState({
      basket: [],
      currentBasket: [],
      deliveryAddress: '',
      basketTotal: 0
    });
  }

  deliveryCharge(amount) {
    this.setState({deliveryCharge: amount});
  }

  addressSet(address) {
    this.setState({deliveryAddress: address});
  }

  componentWillMount() {
    this.runFetch();
  }

  render() {
    return (
      <div className='app'>
        <Header
          currentBasket={this.state.currentBasket}
          clearBasket={this.clearBasket}
          basketTotal={this.state.basketTotal}
        />
        <CurrentStock
          basketItem={this.basketItem}
          stockListArray={this.state.stockListArray}
          deliveryCharge={this.state.deliveryCharge}
          deliveryChargeSet={this.deliveryCharge}
          deliveryAddress={this.state.deliveryAddress}
          addressSet={this.addressSet}
        />
        <TotalPrice
          currentBasket={this.state.currentBasket}
          clearBasket={this.clearBasket}
          basketTotal={this.state.basketTotal}
          deliveryCharge={this.state.deliveryCharge}
          deliveryAddress={this.state.deliveryAddress}
        />
      </div>
    )
  }
}

export default App;

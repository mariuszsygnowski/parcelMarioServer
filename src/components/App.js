import React from 'react';
import CurrentStock from './CurrentStock';
import Header from './Header';
import TotalPrice from './TotalPrice'

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBasket: [],
      menuItems: []
      // deliveryCharge: 0,
      // deliveryAddress: '',
      // basketTotal: 0
    }

    this.runFetch = this.runFetch.bind(this);
    this.basketItem = this.basketItem.bind(this);
    // this.clearBasket = this.clearBasket.bind(this);
    // this.deliveryCharge = this.deliveryCharge.bind(this);
    // this.addressSet = this.addressSet.bind(this);

  }

  runFetch() {
    fetch('/api/menu')
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

  basketItem(item, quantity) {
    const itemAlreadyInBasket = this.state.currentBasket.find((existing) => {
      return existing.id === item.id;
    });

    let newBasket;
    if (itemAlreadyInBasket) {
      newBasket = this.state.currentBasket.map((basketItem) => {
        if (basketItem.id === item.id) {
          return Object.assign({}, basketItem, { quantity });
        } else {
          return basketItem;
        }
      })
    } else {
      newBasket = this.state.currentBasket.concat([Object.assign({}, item, { quantity })])
    }
    this.setState({ currentBasket: newBasket });    
  };

  // clearBasket() {
  //   this.setState({
  //     basket: [],
  //     currentBasket: [],
  //     deliveryAddress: '',
  //     basketTotal: 0
  //   });
  // }

  // deliveryCharge(amount) {
  //   this.setState({deliveryCharge: amount});
  // }

  // addressSet(address) {
  //   this.setState({deliveryAddress: address});
  // }

  componentWillMount() {
    this.runFetch();
  }

  render() {
    return (
      <div className='app'>
        <Header
          currentBasket={this.state.currentBasket}
          // clearBasket={this.clearBasket}
          // basketTotal={this.state.basketTotal}
        />
        <CurrentStock
          menuItems={this.state.menuItems}
          basketItem={this.basketItem}
          // deliveryCharge={this.state.deliveryCharge}
          // deliveryChargeSet={this.deliveryCharge}
          // deliveryAddress={this.state.deliveryAddress}
          // addressSet={this.addressSet}
        />
        <TotalPrice
          // currentBasket={this.state.currentBasket}
          // clearBasket={this.clearBasket}
          // basketTotal={this.state.basketTotal}
          // deliveryCharge={this.state.deliveryCharge}
          // deliveryAddress={this.state.deliveryAddress}
        />
      </div>
    )
  }
}

export default App;

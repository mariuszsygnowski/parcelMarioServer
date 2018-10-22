import React from 'react';
import Menu from './Menu';
import Header from './Header';
import TotalPrice from './TotalPrice'

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBasket: [],
      totalprice: 0,
      quantity: 0,
      deliveryCharge: '£1.99',
      menuItems: []
      // deliveryAddress: '',
      // basketTotal: 0
    }

    this.runFetch = this.runFetch.bind(this);
    this.basketItem = this.basketItem.bind(this);
    this.priceAndQuantity = this.priceAndQuantity.bind(this);
    this.clearBasket = this.clearBasket.bind(this);
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
    this.setState({ currentBasket: newBasket }, () => {
      this.priceAndQuantity(newBasket);
    });    
    
  };

  priceAndQuantity(basket) {
    let localquantity = 0;
    let localtotalprice = 0;
    basket.forEach(element => {
        localtotalprice += element.price * element.quantity;
        localquantity += element.quantity;        
        this.setState({
          quantity: localquantity,
          totalprice: localtotalprice
        })
        if (localtotalprice < 20) {
          this.setState({
            deliveryCharge: '£1.99'
          })
        }
        if (localtotalprice >= 20) {
          this.setState({
            deliveryCharge: 'free'
          })
        }
    });  
  }

  clearBasket() {
    this.setState({
      currentBasket: [],
      totalprice: 0,
      quantity: 0,
      deliveryCharge: '£1.99',
      menuItems: []
    });
    this.runFetch();
  }

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
          totalprice={this.state.totalprice}
          quantity={this.state.quantity}
          deliveryCharge={this.state.deliveryCharge}
          // clearBasket={this.clearBasket}
          // basketTotal={this.state.basketTotal}
        />
        <Menu
          menuItems={this.state.menuItems}
          basketItem={this.basketItem}
          // deliveryCharge={this.state.deliveryCharge}
          // deliveryChargeSet={this.deliveryCharge}
          // deliveryAddress={this.state.deliveryAddress}
          // addressSet={this.addressSet}
        />
        <TotalPrice
          totalprice={this.state.totalprice}
          quantity={this.state.quantity}
          clearBasket={this.clearBasket}
          deliveryCharge={this.state.deliveryCharge}
          currentBasket={this.state.currentBasket}
        />
      </div>
    )
  }
}

export default App;

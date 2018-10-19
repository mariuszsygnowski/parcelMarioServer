import React from 'react';

class TotalPrice extends React.Component {
    constructor() {
        super();
        // this.state = {
        //     totalPrice: 0
        // }
        this.handleClick = this.handleClick.bind(this);
        this.fetchCurrentBasket = this.fetchCurrentBasket.bind(this);
    }

    handleClick () {

        fetch('/order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                currentBasket: this.props.currentBasket,
                basketTotal: this.props.basketTotal,
                deliveryCharge: this.props.deliveryCharge,
                deliveryAddress: this.props.deliveryAddress
            })
        });

        this.props.clearBasket();
    }

    fetchCurrentBasket() {
        fetch('/basket')
          .then((response) => {
            return response.json();
          })
          .then((body) => {
              console.log(body);
          });
      }

    render() {        
        return (
            <div className='totalPrice container'>
                <button onClick={this.handleClick}>£{this.props.basketTotal + this.props.deliveryCharge} ({this.props.currentBasket.length})</button>
            </div>
        )
    }
}

export default TotalPrice;
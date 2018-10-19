import React from 'react';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            numbersItemsInBasket: 0
        }
        // this.handleClick = this.handleClick.bind(this);
        // this.fetchCurrentBasket = this.fetchCurrentBasket.bind(this);
    }

    // handleClick () {        
    //     fetch('/order', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //         },
    //         body: JSON.stringify(this.props.currentBasket)
    //     })
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((body) => {
    //         // console.log(body);
    //     });
    //     this.props.clearBasket();
      
    // }

    // fetchCurrentBasket() {
    //     fetch('/basket')
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((body) => {
    //           console.log(body);
    //       });
    //   }
    
    
    render() {        
        // console.log( this.props.currentBasket);
        let quantity = 0;
        this.props.currentBasket.forEach(element => {
            quantity += element.quantity;
        });        
        
        return (
            <div className='header container'>
                <span>Mario Food</span>
                <span>Current items in basket: {quantity} </span>
                {/* <button onClick={this.handleClick}>Order!</button>
                <p onClick={this.fetchCurrentBasket} >fetch</p> */}
            </div>
        )
    }
}

export default Header;
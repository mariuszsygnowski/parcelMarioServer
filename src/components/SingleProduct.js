import React from 'react';
import { log } from 'util';

class SingleProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            quantity: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputHandle = this.inputHandle.bind(this);
        this.subtractingQuantity = this.subtractingQuantity.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.basketItem(this.props.singleItem, this.state.quantity);
    }

    inputHandle(event) {  
        if (event.target.value >= 0) {
            this.setState({ quantity: Number(event.target.value) }, () => {this.handleSubmit(event)});
        }
    }

    subtractingQuantity() {
        if (this.state.quantity > 0) {
            this.setState({ quantity: Number(this.state.quantity) - 1 })
        }
    }

    addQuantity() {
        this.setState({ quantity: Number(this.state.quantity) + 1 })
    }

    render() {
        return (
            <div className='singleProduct'>
                <form onSubmit={this.handleSubmit} className='singleProduct__form'>
                    <p>{this.props.singleItem.name}</p>
                    <p>£{this.props.singleItem.price}</p>
                    <button onClick={this.subtractingQuantity}>-</button>
                    <input onChange={this.inputHandle} type="number" value={this.state.quantity} />
                    <button onClick={this.addQuantity}>+</button>
                </form>
            </div>
        )
    }
}

export default SingleProduct;
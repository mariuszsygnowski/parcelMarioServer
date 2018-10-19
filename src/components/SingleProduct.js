import React from 'react';

class SingleProduct extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.singleItem);
        this.props.basketItem(this.props.singleItem);
    }

    render() {
        return (
            <div className='singleProduct'>
                <form onSubmit={this.handleSubmit} className='singleProduct__form'>
                    <p>{this.props.singleItem.name}</p>
                    <p>£{this.props.singleItem.price}</p>
                    <button>+</button>
                </form>
            </div>
        )
    }
}

export default SingleProduct;
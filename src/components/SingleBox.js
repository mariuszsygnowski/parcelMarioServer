import React from 'react';
import '../styles/components/singleResultBox.scss';

class SingleBox extends React.Component {
    constructor() {
        super();
        this.state = {
            arrayOfPrices: []
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    // handleChange(event) {
    //     this.props.receivedValuee(event.target.value);
    //     console.log(event.target.value);
    // }

    render() {
        //
        // let newArray = this.state.arrayOfPrices.slice();
        // newArray.push(result.total_price_gross);
        // this.setState({arrayOfPrices:newArray});

        return (
            <div className={'singleResultBox'}>
                <div className="singleResultBox__carrier">{this.props.singleResult.carrier}</div>
                <div className="singleResultBox__serviceName">{this.props.singleResult.service_name}</div>
                <div className="singleResultBox__serviceDescription">{this.props.singleResult.service_description}</div>
                <div className="singleResultBox__service">{this.props.singleResult.service}</div>
                <div className='singleResultBox__priceNet'>£{this.props.singleResult.total_price_net}</div>
                <div className='singleResultBox__priceGross'>£{this.props.singleResult.total_price_gross} inc VAT</div>
                <img className='singleResultBox__image' src="http://upload.gpsdirectory.net/uploadfolder/1496898225.jpg"/>
                <a className='singleResultBox__bookNow' href="#"><button className='singleResultBox__bookNow__button'>Book Now</button></a>
            </div>

        );
    }
}

export default SingleBox;
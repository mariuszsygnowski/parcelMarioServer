import React from 'react';
import '../styles/components/results.scss';
import SingleBox from './SingleBox';

class Results extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
        // this.receivedValuee = this.receivedValuee.bind(this);

    }

    // receivedValuee (value) {
    //     this.setState({
    //         textHeightBox: value
    //     });
    //     console.log(this.state.textHeightBox);
    // }

    render() {

        return (

                <div className={'results container'}>
                    {this.props.arrayOfResults.map((result, index) => {

                        return <SingleBox
                            key={index}
                            singleResult={result}
                        />;
                    })}

                </div>

        );
    }
}

export default Results;
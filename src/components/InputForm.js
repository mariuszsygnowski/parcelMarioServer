import React from "react";

class InputForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onFoc = this.onFoc.bind(this);
    this.state = {};
  }

  handleChange(event) {
    this.props.receiveText(event.target.value);
  }
  onFoc(event) {
    // console.log(event.target);
    this.props.onF(event.target);
  }

  render() {
    return (
      <div className={this.props.nameClass}>
        <label>
          {this.props.labelName}
          <input
            min="0"
            onFocus={this.onFoc}
            type={this.props.type}
            value={this.props.text}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
          />
        </label>
      </div>
    );
  }
}

export default InputForm;

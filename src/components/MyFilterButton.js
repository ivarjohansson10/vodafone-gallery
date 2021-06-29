import React from "react";

class MyFilterButton extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      enabledFilter: false,
    };
  }
  
  
  handleChange = () => {
    this.setState({ enabledFilter: !this.state.enabledFilter });
  }
  
  
  render() {
    return (
      <div className="filters">
        <label
          htmlFor={this.props.name}
          className={this.state.enabledFilter ? "active" : "idle"}
        >
          {this.props.name}
        </label>
        <input
          type="checkbox"
          id={this.props.name}
          onClick={this.props.onClick}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default MyFilterButton;

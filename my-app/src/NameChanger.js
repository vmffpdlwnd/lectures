import React, { Component } from "react";

class NameChanger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "나리",
    };
  }

  changeName = () => {
    this.setState({
      name: "둘리",
    });
  };

  render() {
    return (
      <div>
        <p> 현재 이름: {this.state.name}</p>
        <button onClick={this.changeName}>이름변경</button>
      </div>
    );
  }
}

export default NameChanger;

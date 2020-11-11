import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: 10001,
      date: "",
      sunrise: "",
      sunset: "",
      timezone: "",
    };
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getDetails(e) {
    e.preventDefault();
    axios.post(`/sun/set?zip=${this.state.zipcode}`).then((res) => {
      this.setState(res.data);
    });
  }

  render() {
    const { date, sunrise, sunset, timezone } = this.state;
    let display =
      this.state.date !== "" ? (
        <div>
          <div className="details">Date: {date}</div>
          <div className="details">Sunrise: {sunrise} am</div>
          <div className="details">Sunset: {sunset} pm</div>
        </div>
      ) : null;
    return (
      <div className="App">
        <form onSubmit={(e) => this.getDetails(e)}>
          <input
            name="zipcode"
            placeholder={"Enter Zipcode"}
            onChange={(e) => this.changeHandler(e)}
          />
          <input type="submit" />
        </form>
        {display}
      </div>
    );
  }
}

export default App;

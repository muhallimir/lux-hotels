import React, { Component } from "react";
// import logo from "../images/logo.png";
import logo from "../images/logo.png";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img className="logo" src={logo} height="75px" alt="my-hotel" />
            </Link>
            {/* navbar toggle button */}
            <button type="button" className="nav-btn">
              <FaAlignJustify
                className="nav-icon"
                onClick={this.handleToggle}
              />
            </button>
          </div>

          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

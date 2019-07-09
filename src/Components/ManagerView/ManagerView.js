import React, { Component } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "./ManagerView.css";

class ManagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="mVBody">
        <header>
          <h1>Mr. Manager</h1>
          <div id="tableButtonContainerMV">
            <button className="tableNavButtons">
              <FaAngleDoubleLeft />
            </button>
            <button className="tableButtons">Table 1</button>
            <button className="tableButtons">Table 2</button>
            <button className="tableButtons">Table 3</button>
            <button className="tableButtons">Table 4</button>
            <button className="tableButtons">Table 5</button>
            <button className="tableNavButtons">
              <FaAngleDoubleRight />
            </button>
          </div>
          <div className="changeViewButtonContainerMV">
            <button>Dining Room</button>
            <button>Bar</button>
            <button>Kitchen</button>
            <button>Admin</button>
          </div>
        </header>
        <section className="mainBoxMV">
          <div id="menuAndEmpBoxMV">
            <div>
              <button>App</button>
              <button>Entree</button>
              <button>Dessert</button>
              <button>Drinks</button>
            </div>
            <div>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
              <button>Empty</button>
            </div>
          </div>
          <div id="menuAndEmpChangeInputs">
            <input placeholder="Random Input" />
            <input placeholder="Random Input" />
            <input placeholder="Random Input" />
            <input placeholder="Random Input" />
            <input placeholder="Random Input" />
            <button>Save Changes</button>
          </div>
        </section>
        <footer>
          <button>Logout</button>
          <button>Update Employees</button>
          <button>Update Menu</button>
        </footer>
      </div>
    );
  }
}

export default ManagerView;

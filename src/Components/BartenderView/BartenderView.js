import React, { Component } from "react";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "./BartenderView.css";
import axios from "axios";

class ServerView extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      empTickets: [],
      currentTicket: [],
      newItems: [],
      mod: ""
    };
    this.getUnsetTickets = this.getUnsetTickets.bind(this);
  }
  componentDidMount() {
    this.getUnsetTickets();
  }

  getUnsetTickets() {
    axios
      .post("/api/emptickets", {
        restaurant: this.props.user,
        employee: this.props.restaurant.currentEmployeeName
      })
      .then(res => {
        this.setState({
          tickets: res
        });
      });
  }

  addAnother(item) {
    axios
      .put("/api/ticket", {
        restaurant: this.props.user,
        tablenum: item.tablenum,
        itemnum: item.itemnum + 1,
        item: item.item,
        itemprice: item.itemprice,
        mod: item.mod,
        ticketnum: item.ticketnum,
        ticketsplit: item.ticketsplit,
        employee: item.employee,
        newtable: item.table
      })
      .then(() => {
        this.getUnsetTickets();
      });
  }

  editMod(item) {
    let index = this.state.newItems.indexOf(item);
    return (this.state.newItems[index].mod = this.state.mod);
  }

  render() {
    // maps employee tickets to an array of arrays by ticket number
    const { currentTicket, newItems, empTickets, tickets } = this.state;
    let counter = 0;
    let total = 0;
    for (let i = 0; i < tickets.length; i++) {
      if (!empTickets[0]) {
        empTickets.push([tickets[i]]);
      } else if (tickets[i].ticketnum === empTickets[counter][0].ticketnum) {
        empTickets[counter].push(tickets[i]);
      } else {
        empTickets.push([tickets[i]]);
        counter++;
      }
    }

    // maps the current ticket info and gives each a remove button
    const mappedCurrentTicket = currentTicket.map(item => {
      total += item.itemprice;
      return (
        <li className="ticketItem" key={item._id}>
          <button onClick={e => this.addAnother(item)}>+</button>
          <span>
            {item.itemnum} {item.item} {item.itemprice}
          </span>
          <span>{item.mod}</span>
        </li>
      );
    });

    // maps the new items below the current ticket
    const mappedNewItems = newItems.map(item => {
      total += item.itemprice;
      return (
        <li className="ticketItem" key={item.id}>
          <span>
            {item.itemnum} {item.item} {item.itemprice}
          </span>
          <span>{item.mod}</span>
          <button onClick={() => this.editMod(item)}>mod</button>
          <button onClick={() => this.removeNewItem(item.id)}>x</button>
        </li>
      );
    });

    // maps tickets by table to the top bar
    const mappedTableButtons = empTickets.map(item => {
      return (
        <button
          className="table"
          onClick={() => this.selectTable(item[0].tablenum)}
        >
          {item[0].tablenum}
        </button>
      );
    });

    return (
      <div className="bartender-page">
        <div className="table-container">{mappedTableButtons}</div>
        <div className="menu-selections">
          <div className="circle-container">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
        </div>
        <div className="info-section">
          <div className="items-container">
            <section className="menu-items">
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
              <div className="box item1" />
            </section>
            <section className="menu-items">
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
              <div className="box item2" />
            </section>
            <section className="menu-items">
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
              <div className="box item3" />
            </section>
            <section className="menu-items">
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
              <div className="box item4" />
            </section>
          </div>
          <div className="tickets">
            <p className="title">NOTA-POS</p>
            <div className="bar" />
            <div className="ticket">
              {mappedCurrentTicket}
              {mappedNewItems}
            </div>
            <div className="price-tag">{total}</div>
          </div>
        </div>
        <footer>
          <button className="logout"> LOGOUT </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { userInfo, restaurantInfo } = reduxState;
  return {
    user: userInfo.user,
    restaurant: restaurantInfo
  };
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ServerView);

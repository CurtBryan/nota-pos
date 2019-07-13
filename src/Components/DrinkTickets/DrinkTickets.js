import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import "./DrinkTickets.css";
import axios from "axios";
const socket = io();

const mapStateToProps = reduxState => {
  const { user, restaurantInfo, tickets } = reduxState;
  return {
    user: user.user,
    restaurant: restaurantInfo,
    tickets: tickets.barTickets
  };
};

const mapDispatchToProps = {
  setBarTickets
};

class DrinkTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticks: [],
      numberofSelected: 1,
      itemprice: 0,
      mod: "",
      ticketsplit: 1,
      newPin: 0
    };
    socket.on("newBar", tickets => {
      this.props.setBarTickets(tickets);
    });
  }

  editTicketItem(item) {
    axios
      .put("/api/ticket", {
        restaurant: this.props.restaurant,
        tablenum: item.tablenum,
        itemnum: this.state.numberofSelected,
        item: item.item,
        itemprice: this.state.itemprice,
        mod: this.state.mod,
        ticketnum: item.ticketnum,
        ticketsplit: this.state.ticketsplit,
        employee: this.state.newPin,
        newtable: this.state.newtable
      })
      .then(res => socket.emit("updateBarTickets", res));
  }

  render() {
    const { ticks } = this.state;
    const { tickets } = this.props;
    let counter = 0;
    for (let i = 0; i < tickets.length; i++) {
      if (!ticks[0]) {
        ticks.push([tickets[i]]);
      } else if (tickets[i].ticketnum === ticks[counter][0].ticketnum) {
        ticks[counter].push(tickets[i]);
      } else {
        ticks.push([tickets[i]]);
        counter++;
      }
    }
    let total = 0;
    let mappedTicks = ticks.map(element => {
      let mappedItems = element.map(item => {
        total += item.itemprice * item.itemnum;
        <li key={item._id}>
          <span>
            {item.itemnum} {item.item} {item.itemprice}
          </span>
          <span>{item.mod}</span>
        </li>;
      });
      <div className="Ticket">
        <ul className="ticket-items">{mappedItems}</ul>
      </div>;
    });
    return (
      <div>
        {mappedTicks}
        <div className="total">Total: {total}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkTickets);

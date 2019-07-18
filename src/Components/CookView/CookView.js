import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { setKitchenTickets } from "../../ducks/ticketReducer";
import { Redirect } from "react-router-dom";
import "./CookView.css";
import axios from "axios";
const socket = io("http://localhost:4000/");

const mapStateToProps = reduxState => {
  const { userInfo, restaurantInfo, tickets } = reduxState;
  return {
    user: userInfo.user,
    restaurant: restaurantInfo,
    tickets: tickets.kitchenTickets
  };
};

const mapDispatchToProps = {
  setKitchenTickets
};

class CookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticks: []
    };
    socket.on("newKitchen", tickets => {
      console.log("newKitchen hit", tickets);
      this.props.setKitchenTickets(tickets);
    });
    socket.on("updateTickets", () => {
      this.grabKitchenTicketsNoSocket();
    });
    this.printForKitchen = this.printForKitchen.bind(this);
    this.grabKitchenTickets = this.grabKitchenTickets.bind(this);
    this.grabKitchenTicketsNoSocket = this.grabKitchenTicketsNoSocket.bind(
      this
    );
  }

  componentDidMount() {
    this.grabKitchenTickets();
  }

  grabKitchenTickets() {
    axios.get(`/api/kitchen/${this.props.user}`).then(response => {
      socket.emit("updateKitchenTickets", response);
    });
  }

  grabKitchenTicketsNoSocket() {
    axios.get(`/api/kitchen/${this.props.user}`).then(response => {
      this.props.setKitchenTickets(response);
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

  // "prints" the ticket from the bar side, still visible to original author until closed on their end
  printForKitchen(item) {
    axios
      .put("/api/madetickets", {
        restaurant: this.props.user,
        ticketnum: item.ticketnum,
        drink: true
      })
      .then(res => socket.emit("updateKitchenTickets", res));
  }

  render() {
    // maps employee tickets to an array of arrays by ticket number
    console.log(this.props.tickets);
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
    // maps tickets to from an array of arrays to the display
    let total = 0;
    let mappedTicks = ticks.map(element => {
      let mappedItems = element.map(item => {
        total += item.itemprice * item.itemnum;
        return (
          <li key={item._id}>
            <span>
              {item.itemnum} {item.item} {item.itemprice}
            </span>
            <span>{item.mod}</span>
          </li>
        );
      });
      return (
        <div className="Ticket">
          <ul className="ticket-items">{mappedItems}</ul>
          <div className="total">Total: {total}</div>
          <button onClick={this.printForKitchen(element[0].ticketnum)}>
            Print
          </button>
        </div>
      );
    });
    console.log(mappedTicks);
    // prints the tickets on screen
    return (
      <div className="MappedTickets">
        {" "}
        {!this.props.restaurant.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}
        {mappedTicks}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CookView);

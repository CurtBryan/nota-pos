import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAllTickets } from "../../ducks/ticketReducer";
import "./ServerMV.css";

class ServerMV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      ticks: []
    };
  }

  componentDidMount() {
    const { user } = this.props.userInfo;
    this.props.setAllTickets(user);
  }

  render() {
    console.log(this.props.tickets);
    const { allTickets } = this.props.tickets;
    const { ticks } = this.state;
    console.log(ticks);
    let counter = 0;

    // !this.props.tickets.allTickets.length ?
    for (let i = 0; i < allTickets.length; i++) {
      if (!ticks[0]) {
        ticks.push([allTickets[i]]);
      } else if (allTickets[i].ticketnum === ticks[counter][0].ticketnum) {
        ticks[counter].push(allTickets[i]);
      } else {
        ticks.push([allTickets[i]]);
        counter++;
      }
    }
    let mappedTicks = ticks.map(element => {
      let mappedItems = element.map(item => {
        return (
          <li className="ticketBox" key={item._id}>
            <span>
              {item.item} ${item.itemprice}
            </span>
          </li>
        );
      });
      return (
        <div className="Ticket">
          <ul className="ticket-items">{mappedItems}</ul>
          {/* <div className="total">Total: {total}</div> */}
        </div>
      );
    });
    return (
      <div className="serverMVPage">
        {!this.props.restaurantInfo.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}
        {!this.state.redirect ? null : (
          <div>
            <Redirect to="/manager" />
          </div>
        )}
        <button
          onClick={() => {
            this.setState({
              redirect: true
            });
          }}
        >
          Edit Menu/Employees
        </button>
        <div className="mappedticks">{mappedTicks}</div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setAllTickets
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ServerMV);

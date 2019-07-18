import React, { Component } from "react";
import { setUser } from "../../ducks/userReducer";
import { setMenu } from "../../ducks/restaurantReducer";
import { setLatestTicketNum } from "../../ducks/ticketReducer";
import { selectEmployee } from "../../ducks/restaurantReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";
import "./BartenderView.css";
import axios from "axios";
const socket = io("http://localhost:4000/");

class ServerView extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      // empTickets: [],
      currentTicket: [],
      newItems: [],
      mod: "",
      divSelect: 0
    };
    socket.on("updateTickets", () => {
      // console.log("updating Tickets");
      this.getUnsetTickets();
      this.props.setLatestTicketNum(this.props.user);
    });
    this.getUnsetTickets = this.getUnsetTickets.bind(this);
  }
  componentDidMount() {
    this.getUnsetTickets();
    this.props.setMenu(this.props.user);
    this.props.setLatestTicketNum(this.props.user);
  }

  getUnsetTickets = () => {
    axios
      .post("/api/emptickets", {
        restaurant: this.props.user,
        employee: this.props.restaurant.currentEmployeeName
      })
      .then(res => {
        // console.log(res);
        this.setState({
          tickets: res.data
        });
      });
  };

  addAnother(item) {
    console.log(item);
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
        newtable: item.tablenum
      })
      .then(() => {
        this.getUnsetTickets();
      });
  }

  editMod(item) {
    let index = this.state.newItems.indexOf(item);
    this.state.newItems[index].mod = this.state.mod;
  }

  removeNewItem(item) {
    let index = this.state.newItems.indexOf(item);
    this.state.newItems.splice(index, 1);
    this.setState({ state: this.state });
  }

  selectTable(item, arr) {
    console.log(item, arr);
    this.setState({
      currentTicket: arr[arr.indexOf(item)]
    });
  }

  saveTicket() {
    let promises = [];
    this.state.newItems.forEach(item => {
      promises.push(
        axios.post("/api/newticket", {
          ...item
        })
      );
    });
    console.log(promises);
    Promise.all(promises).then(response => {
      socket.emit("newTicket", "sent new");
    });
  }

  logout = () => {
    this.props.selectEmployee(null);
  };

  addItem = item => {
    if (this.state.newTicketNumber !== 0 && this.props.latestticketnum) {
      // console.log(item);
      this.setState({
        newItems: [
          ...this.state.newItems,
          {
            restaurant: this.props.user,
            employee: this.props.restaurant.currentEmployeeName,
            tablenum: this.state.newTableNum,
            itemnum: 1,
            item: item.item,
            itemprice: item.price,
            drink: item.drink,
            mod: this.state.mod,
            ticketnum: this.props.latestticketnum + 1
          }
        ]
      });
      // console.log(this.state.newItems);
    } else {
      return "Please select a table number to start a new ticket";
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.setState({
        newTableNum: parseInt(e.target.value)
      });
    }
  };

  render() {
    // maps employee tickets to an array of arrays by ticket number
    console.log(this.state);
    console.log(this.props.latestticketnum);
    const {
      currentTicket,
      newItems,
      // empTickets,
      tickets,
      divSelect
    } = this.state;
    let empTickets = [];
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
          <button onClick={() => this.removeNewItem(item)}>x</button>
        </li>
      );
    });

    // maps tickets by table to the top bar
    const mappedTableButtons = empTickets.map(item => {
      return (
        <button
          className="table"
          onClick={() => this.selectTable(item, empTickets)}
        >
          {item[0].tablenum}
        </button>
      );
    });

    let display;

    // mapped menu items
    if (!this.props.restaurant.menu.length) {
      display = [];
    } else {
      display = this.props.restaurant.menu[divSelect].items.map(item => {
        return (
          <div key={item._id}>
            <section className="menu-itemsMV">
              <button
                className="boxMV item1MV"
                onClick={() => this.addItem(item)}
              >
                <h1>{item.item}</h1>
                <h1>${item.price}</h1>
              </button>
            </section>
          </div>
        );
      });
    }

    return (
      <div className="bartender-page">
        {!this.props.restaurant.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}
        <div className="table-container">{mappedTableButtons}</div>
        <div className="menu-selections">
          <div className="circle-container">
            <button
              onClick={() =>
                this.setState({
                  divSelect: 0
                })
              }
              className="circleMV"
            >
              App
            </button>
            <button
              onClick={() =>
                this.setState({
                  divSelect: 1
                })
              }
              className="circleMV"
            >
              Entree
            </button>
            <button
              onClick={() =>
                this.setState({
                  divSelect: 2
                })
              }
              className="circleMV"
            >
              Dessert
            </button>
            <button
              onClick={() =>
                this.setState({
                  divSelect: 3
                })
              }
              className="circleMV"
            >
              Drink
            </button>
          </div>
        </div>
        <div className="info-section">
          <div className="items-container">{display}</div>
          <div className="tickets">
            <p className="title">NOTA-POS</p>
            <div className="bar">
              {!this.state.currentTicket[0] ? (
                <div className="new table num input">
                  <span>New Table Number: </span>
                  <input onKeyDown={e => this.handleKeyDown(e)} />
                  <span>Table Number: {this.state.newTableNum} </span>
                </div>
              ) : (
                <div className="Current table num display">
                  <span>
                    Current Table Number: {this.state.currentTicket[0].tablenum}
                  </span>
                </div>
              )}
            </div>
            <div className="ticket">
              {mappedCurrentTicket}
              {mappedNewItems}
            </div>
            <div className="price-tag">
              <button onClick={() => this.printTicket()}>Print</button>
              {total}
              <button onClick={() => this.saveTicket()}>Save</button>
            </div>
          </div>
        </div>
        <footer>
          <button
            className="logout"
            onClick={() => {
              this.logout();
            }}
          >
            {" "}
            LOGOUT{" "}
          </button>
          <Link to="/bartickets">
            <button>tickets</button>
          </Link>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { userInfo, restaurantInfo, tickets } = reduxState;
  return {
    user: userInfo.user,
    restaurant: restaurantInfo,
    latestticketnum: tickets.latestTicketNum
  };
};

const mapDispatchToProps = {
  setUser,
  setMenu,
  setLatestTicketNum,
  selectEmployee
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ServerView);

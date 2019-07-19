import React, { Component } from "react";
import { setUser } from "../../ducks/userReducer";
import { setMenu } from "../../ducks/restaurantReducer";
import { setLatestTicketNum } from "../../ducks/ticketReducer";
import { selectEmployee } from "../../ducks/restaurantReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";
import cola from '../ServerView/cola.png';
import guacamole from '../ServerView/guacamole.png';
import hamburger from '../ServerView/hamburger.png';
import cupcake from '../ServerView/cupcake.png';
import server from '../ServerView/server.png';
import chef from '../ServerView/chef.png';
import bar from '../ServerView/bar.png';
import trash from '../ServerView/trash.png';
import "./BartenderView.css";
import axios from "axios";
const socket = io("http://localhost:4000/");

class BartenderView extends Component {
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
        <li  key={item._id}>
             {/* <button onClick={e => this.addAnother(item)}>+</button> */}
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
        <div className="menu-item-list-container">
        <li className="menu-item-list" key={item.id}>
          <span className="menu-item-list">
            {item.itemnum} {item.item} {item.itemprice}
          </span>
          <span>{item.mod}</span>
          <button className="price-btn" onClick={() => this.editMod(item)}>Notes</button>
          <button className="price-btn" onClick={() => this.removeNewItem(item)}>
          <img  className="trash" src={trash} alt="trash"/> 
         </button>
        </li>
        <br />
        </div>
      );
    });

    // maps tickets by table to the top bar
    const mappedTableButtons = empTickets.map(item => {
      return (
        <button
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
            <section className="box-container">
              <button
                 className="box"
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
      <div>
       <div className="table-container-items">
      </div>
      <div className="view-container">
        {!this.props.restaurant.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}
       
        <div className="menu-nav">
             <button className="btn-menu"
              onClick={() =>
                this.setState({
                  divSelect: 3
                })
              }
              
            >
               <img className="drink" src={cola} alt="drink"/>
              Drinks
            </button>
            <button className="btn-menu"
            
            onClick={() =>
              this.setState({
                divSelect: 0
              })
            }
        
          >
             <img  className="guac" src={guacamole} alt="guac"/>
            Starts
          </button>
            <button className="btn-menu"
              onClick={() =>
                this.setState({
                  divSelect: 1
                })
              }
             
            >
               <img  className="ham" src={hamburger} alt="ham"/>
              Entrees
            </button>
          
          
            <button className="btn-menu"
              onClick={() =>
                this.setState({
                  divSelect: 2
                })
              }
              
            >
               <img  className="pie" src={cupcake} alt="pie"/>
              Desserts
            </button>
            <button
            className="logout link"
            onClick={() => {
              this.logout();
            }}
          >
            {" "}
            LOGOUT{" "}
          </button>
         
          <Link to="/bartickets">
            <button className="logout ticket-link" >tickets</button>
          </Link>
        </div>
       
     
          <div className="box-container">{display}</div>
          <div className="price-container">
        
           

        <div className="title-conatiner">
           <h1 className="title">Orders</h1>
        
         </div>
  
         <hr/>

            <div className="ticket-container">
            {mappedTableButtons}   
        <div className="tickets-items">{mappedCurrentTicket}</div>
        <span className="new-table-num-input">Table Number: {this.state.newTableNum} </span>
       {!this.state.currentTicket[0] ? (
                <div className="new-table-num-input">
                  <span>New Table Number : </span>
                  <input onKeyDown={e => this.handleKeyDown(e)} />
                </div>
              ) : (
                <div className="Current table num display">
                  <span>
                    Current Table Number: {this.state.currentTicket[0].tablenum}
                  </span>
                </div>
        )}

            <div className="tickets">
            
            <div className="tickets-menu">  {mappedNewItems} </div>
            </div>
            </div>
            
            <div className="total-price">{total}</div> 
            <div className="btn-extra">
              <button onClick={() => this.printTicket()}>Print</button>
              <button onClick={() => this.saveTicket()}>Save</button>
            </div>
       
          </div>
        </div>
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

export default invokedConnect(BartenderView);

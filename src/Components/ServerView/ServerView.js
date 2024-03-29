import React, {Component} from 'react';
import { setUser } from '../../ducks/userReducer';
import { setMenu } from '../../ducks/restaurantReducer';
import { setLatestTicketNum } from "../../ducks/ticketReducer";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { selectEmployee } from "../../ducks/restaurantReducer";
import axios from "axios";
import io from "socket.io-client";
import cola from './cola.png';
import guacamole from './guacamole.png';
import hamburger from './hamburger.png';
import cupcake from './cupcake.png';
import server from './server.png';
import chef from './chef.png';
import bar from './bar.png';
import trash from './trash.png';
import './ServerView.css';
const socket = io("http://localhost:4000/");



class ServerView extends Component {
    constructor(){
        super()
        this.state = {
            tickets: [],
            newItems: [],
            currentTicket: [],
            divison: 0,
            mod: "",
            currentTicket: []
        
        }
        socket.on("updateTickets", () => {
          // console.log("updating Tickets");
          this.getUnsetTickets();
          this.props.setLatestTicketNum(this.props.user);
        });
        this.getUnsetTickets = this.getUnsetTickets.bind(this);
    }

    componentDidMount () {
      // const { user } = this.props.userInfo
      // this.props.userInfo(this.props.user)
      this.getUnsetTickets();
      this.props.setMenu(this.props.user);
      this.props.setLatestTicketNum(this.props.user);
    };

    getUnsetTickets = () => {
      axios
        .post("/api/emptickets", {
          restaurant: this.props.user,
          
          employee: this.props.restaurant.currentEmployee
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
  


    logout = () => {
      this.props.selectEmployee(null);
    };

    render(){

    console.log(this.state);
    console.log(this.props.latestticketnum);
    const {
      currentTicket,
      newItems,
      // empTickets,
      tickets,
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




      console.log(this.props.restaurant)
      const { divison } = this.state;
        console.log(this.props.restaurant.menu[divison])

        if (!this.props.restaurant.menu.length) {
          return [];
        } 
        const mappedMenu = this.props.restaurant.menu[divison].items.map( menu => {
        return (
          <div  className="box" key={menu.id}>
            <h1>{menu.item}</h1>
            <h1>{menu.price}</h1>
          </div>
        )
        })
        console.log(this.props.restaurant)

        // maps the current ticket info and gives each a remove button
        const mappedCurrentTicket = currentTicket.map(item => {
          total += item.itemprice;
          return (
            <li key={item._id}>
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
              <div className="menu-item-list-container">
              <li  className="menu-item-list" key={item.id}>
                <span className="menu-item-list">
                {item.itemnum}{item.item} {item.itemprice}
                </span>
                <span>{item.mod}</span>
                <button className="price-btn" onClick={() => this.editMod(item)}>Notes</button>
                <br/>
                <button className="price-btn" onClick={() => this.removeNewItem(item)}>
                <img  className="trash" src={trash} alt="trash"/> 
                </button>
              </li>
              <br/>
              </div>
            );
          });

  
         


          // maps tickets by table to the top bar
          const mappedTableButtons = empTickets.map(item => {
            return (
              <button
                // className="table"
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
      display = this.props.restaurant.menu[divison].items.map(item => {
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
          
          <div className="view-container">

  
      {!this.props.restaurant.currentEmployeePos ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : null}     
   
        {/* MENU *SIDE NAVIGATION */}
          <div>{mappedTableButtons}</div>
       <div className="menu-nav">
  
          <button className="btn-menu"  onClick={() => this.setState({ divison: 3 })} >
            <img className="drink" src={cola} alt="drink"/>
            Drinks

          </button>
          <button className="btn-menu" onClick={() => this.setState({ divison: 0 })}>
            <img  className="guac" src={guacamole} alt="guac"/>
            Starts
          </button>
          <button className="btn-menu" onClick={() => this.setState({ divison: 1 })}>
            <img  className="ham" src={hamburger} alt="ham"/>
            Entrees
          </button>
           <button className="btn-menu" onClick={() => this.setState({ divison: 2 })}>
            <img  className="pie" src={cupcake} alt="pie"/>
            Desserts
           </button>
         

          {(this.props.restaurant.currentEmployeePos === "Manager") ?
         
          ( <div>
          <button className="btn-menu">
          <img  className="server" src={server} alt="server"/>
          Server
          </button>
            <button className="btn-menu">
          <img  className="chef" src={chef} alt="chef"/>
          Cook
          </button>
          <button className="btn-menu">
            <img  className="bar" src={bar} alt="bar"/>
          Bartender
          </button> 
            </div>
        ) :
          (null)
          }

        <button className="btn-logout" onClick={() => {this.logout();}}>
          Logout
        </button>
       </div>
  
      {/* BOX *CONTAINER */}
    
         <div className="box-container">
        {display}
         </div>
      
      {/* PRICE *CONTAINER */}
       
     


       <div className="price-container">
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

  
      {/* TITLES */}
  
         <div className="title-conatiner">
           <h1 className="title">Orders</h1>
         </div>
  
         <hr/>

  
       {/* TICKETS */}
  
       <div className="ticket-container">

            <div className="tickets">
              {mappedCurrentTicket}
              {mappedNewItems}
            </div>
  
        
              <button className="total-price">{total}</button> 
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

export default invokedConnect(ServerView);

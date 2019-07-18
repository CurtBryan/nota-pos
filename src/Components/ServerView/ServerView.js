import React, {Component} from 'react';
import { setUser } from '../../ducks/userReducer';
import { setMenu } from '../../ducks/restaurantReducer';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { selectEmployee } from "../../ducks/restaurantReducer";
import cola from './cola.png';
import guacamole from './guacamole.png';
import hamburger from './hamburger.png';
import cupcake from './cupcake.png';
import server from './server.png';
import chef from './chef.png';
import bar from './bar.png';
import trash from './trash.png';
import './ServerView.css';


class ServerView extends Component {
    constructor(){
        super()
        this.state = {
            divison: 0
        }
    }

    componentDidMount = () => {
      const { user } = this.props.userInfo
      // this.props.setEmployee(user);
      this.props.setMenu(user);
    };

    logout = () => {
      this.props.selectEmployee(null);
    };

    render(){

      const { divison } = this.state;
        console.log(this.props.restaurantInfo.menu[divison])

        if (!this.props.restaurantInfo.menu.length) {
          return [];
        } 
        const mappedMenu = this.props.restaurantInfo.menu[divison].items.map( menu => {
        return (
          <div  className="box" key={menu.id}>
            <h1>{menu.item}</h1>
            <h1>{menu.price}</h1>
          </div>
        )
        })
        
        return (
          
          <div className="view-container">
          
          {!this.props.restaurantInfo.currentEmployeePos ? (
            <div>
              <Redirect to="/" />
            </div>
            ) : null}
   
        {/* MENU *SIDE NAVIGATION */}
  
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
         

          {(this.props.restaurantInfo.currentEmployeePos === "Manager") ?
         
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
           {mappedMenu}
          <div className="box">
             <h1>Ribs</h1>
             <h1>18.99</h1>
           </div>
           <div className="box">
           <h1>Nachos</h1>
             <h1>12.99</h1>
           </div>
           <div className="box">
           <h1>Mac&Cheese</h1>
             <h1>6.99</h1>
           </div>
           <div className="box">
           <h1>Cuban Sub</h1>
             <h1>12.99</h1>
           </div>
           <div className="box">
           <h1>Salmon</h1>
             <h1>13.99</h1>
           </div>
           <div className="box">
           <h1>Hot Dog</h1>
             <h1>12.99</h1>
           </div>
           <div className="box">
           <h1>Pizza</h1>
             <h1>16.99</h1>
           </div>
           <div className="box">
           <h1>Steak</h1>
             <h1>20.99</h1>
           </div>
           <div className="box">
           <h1>Pannin</h1>
             <h1>10.99</h1>
           </div>
           <div className="box">
           <h1>Cold Cut</h1>
             <h1>13.99</h1>
           </div>
           <div className="box">
           <h1>Burger</h1>
             <h1>15.99</h1>
           </div>
           <div className="box">
           <h1>Nuggets</h1>
             <h1>8.99</h1>
           </div> 
  
         </div>
      
      {/* PRICE *CONTAINER */}
  
       <div className="price-container">
  
      {/* TITLES */}
  
         <div className="title-conatiner">
           <h1 className="title">Item</h1>
           <h1 className="title">Quantity</h1>
           <h1 className="title"> Price </h1>
         </div>
  
         <hr/>
  
       {/* TICKETS */}
  
       <div className="ticket-container">
         
          <div className="ticket">
    
          <h1 className="title">Burger</h1>
  
          <div className="quantity">
            <div className="circle"> -</div>
            <h1 className="x">2x</h1>
            <div className="circle">+</div>
          </div>
  
          <h1>15.99</h1>
          <img  className="trash" src={trash} alt="trash"/>
          </div>
  
          <button className="total">
           Total
          </button>
      </div>
  
    </div>
    </div>

    );
}
}
  

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
    setUser,
    setMenu,
    selectEmployee
}

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ServerView);

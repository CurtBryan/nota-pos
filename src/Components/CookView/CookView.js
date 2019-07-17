import React, { Component } from "react";
import "./CookView.css";

class CookView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const mappedTickets = this.props.tickets.tickets.map(ticket => {
    //   return <div key={ticket._id}>

    //   </div>
    // })
    return (
      <div>
        <header>
          <button>Logout</button>
        </header>
        <div className="orderDisplayMainFlexCV">
          <section className="orderDisplayCV">
            <div className="ticketsContainerCV">
              <article>Stuff Goes Here 1</article>
              <article>Stuff Goes Here 2</article>
              <article>Stuff Goes Here 3</article>
              <article>Stuff Goes Here 4</article>
            </div>
            <div className="ticketsContainerCV">
              <article>Stuff Goes Here 5</article>
              <article>Stuff Goes Here 6</article>
              <article>Stuff Goes Here 7</article>
              <article>Stuff Goes Here 8</article>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default CookView;

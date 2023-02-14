import React, { Component } from "react";
import axios from "axios";

const { v4: uuidv4 } = require("uuid");

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck_id: "", cards: [] };
    this.dealCard = this.dealCard.bind(this);
  }

  async componentDidMount() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle";
    let response = await axios.get(url);
    let deck_id = response.data.deck_id;
    this.setState({ deck_id: deck_id });
  }

  async dealCard() {
    const url = `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`;
    let response = await axios.get(url);
    let card = response.data.cards[0];
    this.setState((st) => ({
      cards: [...st.cards, card],
    }));
    console.log(card);
    console.log(this.state.cards);
  }

  render() {
    return (
      <div>
        <button onClick={this.dealCard}>Gimme a card!</button>
        {this.state.cards.map((card) => (
          <img
            src={card.image}
            alt={card.code}
            key={uuidv4()}
            className="Deck-card"
          />
        ))}
      </div>
    );
  }
}
export default Deck;

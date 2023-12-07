import { Injectable } from '@angular/core';

class Hand {
  cards: string;
  bid: number;

  constructor(
    cards: string,
    bid: number
  ) {
    this.cards = cards;
    this.bid = bid;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let winnings = 0;

    const hands: Hand[] = [];

    inputLines.map((il) => {
      const handParts = il.split(/\s+/);

      hands.push(new Hand(
        handParts[0],
        +(handParts[1])
      ));
    });

    hands.sort((handA, handB) => {
      const handAInitialRank = this.GetSortValueForHandType(handA);
      const handBInitialRank = this.GetSortValueForHandType(handB);

      if (handAInitialRank != handBInitialRank) {
        return handAInitialRank - handBInitialRank;
      } else {
        for (let i = 0; i < handA.cards.length; i++) {
          const handACurrentCardValue = this.GetCardValue(handA.cards[i]);
          const handBCurrentCardValue = this.GetCardValue(handB.cards[i]);

          if (handACurrentCardValue != handBCurrentCardValue) {
            return handACurrentCardValue - handBCurrentCardValue;
          }
        }

        return 0;
      }
    });

    for (let i = 0; i < hands.length; i++) {
      winnings += (hands[i].bid * (i + 1));
    }

    return winnings;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let winnings = 0;

    const hands: Hand[] = [];

    inputLines.map((il) => {
      const handParts = il.split(/\s+/);

      hands.push(new Hand(
        handParts[0],
        +(handParts[1])
      ));
    });

    hands.sort((handA, handB) => {
      const handAInitialRank = this.GetSortValueForHandTypeWithJokers(handA);
      const handBInitialRank = this.GetSortValueForHandTypeWithJokers(handB);

      if (handAInitialRank != handBInitialRank) {
        return handAInitialRank - handBInitialRank;
      } else {
        for (let i = 0; i < handA.cards.length; i++) {
          const handACurrentCardValue = this.GetCardValueWithJokers(handA.cards[i]);
          const handBCurrentCardValue = this.GetCardValueWithJokers(handB.cards[i]);

          if (handACurrentCardValue != handBCurrentCardValue) {
            return handACurrentCardValue - handBCurrentCardValue;
          }
        }

        return 0;
      }
    });

    for (let i = 0; i < hands.length; i++) {
      winnings += (hands[i].bid * (i + 1));
    }

    return winnings;
  }

  private GetSortValueForHandType(hand: Hand): number {
    const cardCounts = this.GetCardCountsForHand(hand.cards);

    if (this.HandIsFiveOfAKind(cardCounts)) {
      return 7;
    } else if (this.HandIsFourOfAKind(cardCounts)) {
      return 6;
    } else if (this.HandIsFullHouse(cardCounts)) {
      return 5;
    } else if (this.HandIsThreeOfAKind(cardCounts)) {
      return 4;
    } else if (this.HandIsTwoPair(cardCounts)) {
      return 3;
    } else if (this.HandIsPair(cardCounts)) {
      return 2;
    } else {
      return 1;
    }
  }

  private GetSortValueForHandTypeWithJokers(hand: Hand): number {
    const cardCounts = this.GetCardCountsForHand(hand.cards);

    if (cardCounts["J"] && cardCounts["J"] > 0) {
      if (this.HandIsFiveOfAKindWithJokers(cardCounts)) {
        return 7;
      } else if (this.HandIsFourOfAKindWithJokers(cardCounts)) {
        return 6;
      } else if (this.HandIsFullHouseWithJokers(cardCounts)) {
        return 5;
      } else if (this.HandIsThreeOfAKindWithJokers(cardCounts)) {
        return 4;
      } else if (this.HandIsTwoPairWithJokers(cardCounts)) {
        return 3;
      } else if (this.HandIsPairWithJokers(cardCounts)) {
        return 2;
      } else {
        return 1;
      }
    } else {
      if (this.HandIsFiveOfAKind(cardCounts)) {
        return 7;
      } else if (this.HandIsFourOfAKind(cardCounts)) {
        return 6;
      } else if (this.HandIsFullHouse(cardCounts)) {
        return 5;
      } else if (this.HandIsThreeOfAKind(cardCounts)) {
        return 4;
      } else if (this.HandIsTwoPair(cardCounts)) {
        return 3;
      } else if (this.HandIsPair(cardCounts)) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  private HandIsFiveOfAKind(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    return cards.length == 1 && cardCounts[cards[0]] == 5;
  }

  private HandIsFiveOfAKindWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let nonJokerCount = 0;
    let jokerCount = 0;

    cards.map((card) => {
      if (card == "J") {
        jokerCount = cardCounts[card];
      } else {
        nonJokerCount = cardCounts[card];
      }
    })

    return (nonJokerCount + jokerCount == 5);
  }

  private HandIsFourOfAKind(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasFourCount = false;
    let hasOneCount = false;

    cards.map((card) => {
      if (cardCounts[card] == 4) {
        hasFourCount = true;
      } else if (cardCounts[card] == 1) {
        hasOneCount = true;
      }
    });

    return cards.length == 2 && hasFourCount && hasOneCount;
  }

  private HandIsFourOfAKindWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasFourCount = false;

    cards.map((card) => {
      if (card != "J") {
        if (cardCounts[card] + cardCounts["J"] == 4) {
          hasFourCount = true;
        }
      }
    });

    return hasFourCount;
  }

  private HandIsFullHouse(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasThreeCount = false;
    let hasTwoCount = false;

    cards.map((card) => {
      if (cardCounts[card] == 3) {
        hasThreeCount = true;
      } else if (cardCounts[card] == 2) {
        hasTwoCount = true;
      }
    });

    return cards.length == 2 && hasThreeCount && hasTwoCount;
  }

  private HandIsFullHouseWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let threeCounts = 0;

    cards.map((card) => {
      if (card != "J") {
        if (cardCounts[card] + cardCounts["J"] == 3) {
          threeCounts++;
        }
      }
    });

    return threeCounts == 2 && cardCounts["J"] == 1;
  }

  private HandIsThreeOfAKind(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasThreeCount = false;

    cards.map((card) => {
      if (cardCounts[card] == 3) {
        hasThreeCount = true;
      }
    });

    return cards.length > 2 && hasThreeCount;
  }

  private HandIsThreeOfAKindWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let threeCounts = 0;

    cards.map((card) => {
      if (card != "J") {
        if (cardCounts[card] + cardCounts["J"] == 3) {
          threeCounts++;
        }
      }
    });

    return threeCounts > 0;
  }

  private HandIsTwoPair(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let twoCounts = 0;

    cards.map((card) => {
      if (cardCounts[card] == 2) {
        twoCounts++;
      }
    });

    return cards.length == 3 && twoCounts == 2;
  }

  private HandIsTwoPairWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let twoCounts = 0;

    cards.map((card) => {
      if (card != "J") {
        if (cardCounts[card] + cardCounts["J"] == 2) {
          twoCounts++;
        }
      }
    });

    return twoCounts == 2;
  }

  private HandIsPair(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasTwoCount = false;

    cards.map((card) => {
      if (cardCounts[card] == 2) {
        hasTwoCount = true;
      }
    });

    return cards.length == 4 && hasTwoCount;
  }

  private HandIsPairWithJokers(cardCounts: any): boolean {
    const cards = Object.getOwnPropertyNames(cardCounts);

    let hasTwoCount = false;

    cards.map((card) => {
      if (card != "J") {
        if (cardCounts[card] + cardCounts["J"] == 2) {
          hasTwoCount = true;
        }
      }
    });

    return hasTwoCount;
  }

  private GetCardValue(card: string): number {
    switch (card) {
      case 'A':
        return 13;
      case 'K':
        return 12;
      case 'Q':
        return 11;
      case 'J':
        return 10;
      case 'T':
        return 9;
      case '9':
        return 8;
      case '8':
        return 7;
      case '7':
        return 6;
      case '6':
        return 5;
      case '5':
        return 4;
      case '4':
        return 3;
      case '3':
        return 2;
      case '2':
      default:
        return 1;
    }
  }

  private GetCardValueWithJokers(card: string): number {
    switch (card) {
      case 'A':
        return 13;
      case 'K':
        return 12;
      case 'Q':
        return 11;
      case 'T':
        return 10;
      case '9':
        return 9;
      case '8':
        return 8;
      case '7':
        return 7;
      case '6':
        return 6;
      case '5':
        return 5;
      case '4':
        return 4;
      case '3':
        return 3;
      case '2':
        return 2;
      case 'J':
      default:
        return 1;
    }
  }

  private GetCardCountsForHand(cards: string): any {
    let cardCounts: any = {};

    cards.split('').map((char) => {
      if (Object.hasOwn(cardCounts, char)) {
        cardCounts[char]++;
      } else {
        cardCounts[char] = 1;
      }
    });

    return cardCounts;
  }
}

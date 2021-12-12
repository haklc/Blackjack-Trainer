import { HardAnswer, SplitAnswer, SoftAnswer } from "./basicStrategy.js";
import { getPodatkiCards } from "./podatki.js";
let cards = getPodatkiCards()

function test_getHandValue1(){
    hand = [cards[0],cards[5],cards[0],cards[0]]
    console.log(hand);
    console.log(getHandValue(hand))
}

//test_getHandValue1();

export function test_split1(){
    let hand = [cards[0],cards[5]]
    console.log(SplitAnswer(hand,1))

    hand = [cards[16],cards[16]]
    console.log(hand)
    console.log(SplitAnswer(hand,cards[4]))
}

export function test_hard1(){

    let hand = [cards[4*4],cards[4*4],cards[8*4]]
    console.log(hand)
    console.log(HardAnswer(hand,cards[7*4]))
    hand = [cards[0],cards[4]]
    console.log(hand)
    console.log(HardAnswer(hand,cards[7*4]))
}

export function test_soft1(){

    let hand = [cards[4*4],cards[4*4],cards[8*4]]
    //console.log(hand)
    //console.log(SoftAnswer(hand,cards[7*4]))
    hand = [cards[0],cards[4*6]]
    console.log(hand)
    console.log(SoftAnswer(hand,cards[1*4]))
}
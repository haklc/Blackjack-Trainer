import { getHandValue } from "./engine.js";
import { getHard, getSoft, getSplit } from "./podatki.js";

const split = getSplit()
const hard = getHard()
const soft = getSoft()

export function SplitAnswer(hand,dealerUp){
    if(hand.length != 2 || hand[0].value != hand[1].value)
        return -1
    let val = getHandValue([hand[0]]) - 2 
    let del = getHandValue([dealerUp]) -2 
    return split[val][del]

}

export function HardAnswer(hand,dealerUp){
    let val = getHandValue(hand) - 4 
    let del = getHandValue([dealerUp]) -2 
    return hard[val][del]

}

export function SoftAnswer(hand,dealerUp){
    
    let val = getHandValue(hand) - 13 
    let del = getHandValue([dealerUp]) -2 
    return soft[val][del]

}

export function PlayAnswer(hand,dealerUp){
    let vn = -1
    hand.forEach(function isAs(element){
        if(element.value == "A"){
            vn = 0
        }
    })
    if(vn == -1)
        return HardAnswer(hand,dealerUp)
    else
        return SoftAnswer(hand,dealerUp)


}
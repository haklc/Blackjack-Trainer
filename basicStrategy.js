import { add, getHandValue } from "./engine.js";
import { getHard, getHardPhrases, getSoft, getSoftPhrases, getSplit, getSplitPhrases } from "./podatki.js";

const split = getSplit()
const hard = getHard()
const soft = getSoft()
const phSplit = getSplitPhrases();
const phSoft = getSoftPhrases();
const phHard = getHardPhrases();

export function SplitAnswer(hand,dealerUp){
    if(hand.length != 2 || hand[0].value != hand[1].value)
        return -1
    let val = getHandValue([hand[0]]) - 2 
    let del = getHandValue(dealerUp) -2 
    return split[val][del]

}

export function HardAnswer(hand,dealerUp){
    let val = getHandValue(hand) - 4 
    let del = getHandValue(dealerUp) -2 
    return hard[val][del]

}

export function SoftAnswer(hand,dealerUp){
    
    let val = getHandValue(hand) - 13 
    let del = getHandValue(dealerUp) -2 
    return soft[val][del]

}

export function PlayAnswer(hand,dealerUp){
    if(isHard(hand))
        return HardAnswer(hand,dealerUp)
    else
        return SoftAnswer(hand,dealerUp)
}

export function SplitPhrase(hand){
    let val = getHandValue([hand[0]]);
    return phSplit[val-2];
}

export function PlayPhrases(hand){
    let val = getHandValue(hand);
    if(isHard(hand)){
        return phHard[val-4];
    }else{
        return phSoft[val-13];
    }
}

export function isHard(hand){
    let vrednosti = []
        for(let i=0; i < hand.length ; i++){
            if(hand[i].hidden)
                continue;
            if(hand[i].value == "K" || hand[i].value == "Q" || hand[i].value == "J"){
                vrednosti.push(10);
            }
            else if(hand[i].value == "A"){
                vrednosti.push(11);
            }else{
                vrednosti.push(parseInt(hand[i].value));
            }
        }
        let vsota = vrednosti.reduce(add,0);
        let I_as;
        while(vsota>21){ //ce imamo assa (ali vec) pridobimo najvecjo vsoto oz ce imamo vsoto pod 21 takoj vrnemo vsoto
            I_as = vrednosti.indexOf(11);
            if(I_as == -1){ //ce ni assa
                return vsota;
            }
            else{ //ce je as, ga upostevaj kot vrednost 1 in spet zracunaj vsoto
                vrednosti[I_as] = 1;
                vsota = vrednosti.reduce(add,0);
            }
        }
        
        return vrednosti.indexOf(11) == -1;

}


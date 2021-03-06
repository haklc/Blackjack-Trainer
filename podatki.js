let cards =  [
    {
        "value": "A",
        "suit": "spades"
    },
    {
        "value": "A",
        "suit": "diamonds"
    },
    {
        "value": "A",
        "suit": "clubs"
    },
    {
        "value": "A",
        "suit": "hearts"
    },
    {
        "value": "2",
        "suit": "spades"
    },
    {
        "value": "2",
        "suit": "diamonds"
    },
    {
        "value": "2",
        "suit": "clubs"
    },
    {
        "value": "2",
        "suit": "hearts"
    },
    {
        "value": "3",
        "suit": "spades"
    },
    {
        "value": "3",
        "suit": "diamonds"
    },
    {
        "value": "3",
        "suit": "clubs"
    },
    {
        "value": "3",
        "suit": "hearts"
    },
    {
        "value": "4",
        "suit": "spades"
    },
    {
        "value": "4",
        "suit": "diamonds"
    },
    {
        "value": "4",
        "suit": "clubs"
    },
    {
        "value": "4",
        "suit": "hearts"
    },
    {
        "value": "5",
        "suit": "spades"
    },
    {
        "value": "5",
        "suit": "diamonds"
    },
    {
        "value": "5",
        "suit": "clubs"
    },
    {
        "value": "5",
        "suit": "hearts"
    },
    {
        "value": "6",
        "suit": "spades"
    },
    {
        "value": "6",
        "suit": "diamonds"
    },
    {
        "value": "6",
        "suit": "clubs"
    },
    {
        "value": "6",
        "suit": "hearts"
    },
    {
        "value": "7",
        "suit": "spades"
    },
    {
        "value": "7",
        "suit": "diamonds"
    },
    {
        "value": "7",
        "suit": "clubs"
    },
    {
        "value": "7",
        "suit": "hearts"
    },
    {
        "value": "8",
        "suit": "spades"
    },
    {
        "value": "8",
        "suit": "diamonds"
    },
    {
        "value": "8",
        "suit": "clubs"
    },
    {
        "value": "8",
        "suit": "hearts"
    },
    {
        "value": "9",
        "suit": "spades"
    },
    {
        "value": "9",
        "suit": "diamonds"
    },
    {
        "value": "9",
        "suit": "clubs"
    },
    {
        "value": "9",
        "suit": "hearts"
    },
    {
        "value": "10",
        "suit": "spades"
    },
    {
        "value": "10",
        "suit": "diamonds"
    },
    {
        "value": "10",
        "suit": "clubs"
    },
    {
        "value": "10",
        "suit": "hearts"
    },
    {
        "value": "J",
        "suit": "spades"
    },
    {
        "value": "J",
        "suit": "diamonds"
    },
    {
        "value": "J",
        "suit": "clubs"
    },
    {
        "value": "J",
        "suit": "hearts"
    },
    {
        "value": "Q",
        "suit": "spades"
    },
    {
        "value": "Q",
        "suit": "diamonds"
    },
    {
        "value": "Q",
        "suit": "clubs"
    },
    {
        "value": "Q",
        "suit": "hearts"
    },
    {
        "value": "K",
        "suit": "spades"
    },
    {
        "value": "K",
        "suit": "diamonds"
    },
    {
        "value": "K",
        "suit": "clubs"
    },
    {
        "value": "K",
        "suit": "hearts"
    }
]
const gameStates = {
    bet : '0',
    init : '1',
    userTurn : '2',
    dealerTurn : '3'
}

const Messages =  {
        bet : 'Izberite vi??ino stave!',
        hitStand : 'Izberite potezo',
        bust : 'Bust!',
        userWin : 'Zmagali ste!',
        dealerWin : 'Delivec zmaga!',
        tie : 'Izena??eno!'
}

const Deal = {
    user : '0',
    dealer : '1',
    hidden : '2',
    bot : '3'
}
//DAS is allowed
const Split = [
    [1,1,1,1,1,1,0,0,0,0], //2,2
    [1,1,1,1,1,1,0,0,0,0], //3,3
    [0,0,0,1,1,0,0,0,0,0], //4,4
    [0,0,0,0,0,0,0,0,0,0], //5,5
    [1,1,1,1,1,0,0,0,0,0],   //6,6
    [1,1,1,1,1,1,0,0,0,0],  //7,7
    [1,1,1,1,1,1,1,1,1,1],  //8,8
    [1,1,1,1,1,0,1,1,0,0],  //9,9
    [0,0,0,0,0,0,0,0,0,0], //T,T
    [1,1,1,1,1,1,1,1,1,1] //A,A

]
//hit = 0, stand = 1, double down (hit) = 2
const Hard = [
    [0,0,0,0,0,0,0,0,0,0], //4
    [0,0,0,0,0,0,0,0,0,0], //5
    [0,0,0,0,0,0,0,0,0,0], //6
    [0,0,0,0,0,0,0,0,0,0], //7
    [0,0,0,0,0,0,0,0,0,0], //8
    [0,2,2,2,2,0,0,0,0,0], //9
    [2,2,2,2,2,2,2,2,0,0], //10
    [2,2,2,2,2,2,2,2,2,2], //11
    [0,0,1,1,1,0,0,0,0,0], //12
    [1,1,1,1,1,0,0,0,0,0], //13
    [1,1,1,1,1,0,0,0,0,0], //14
    [1,1,1,1,1,0,0,0,0,0], //15
    [1,1,1,1,1,0,0,0,0,0], //16
    [1,1,1,1,1,1,1,1,1,1], //17
    [1,1,1,1,1,1,1,1,1,1], //18
    [1,1,1,1,1,1,1,1,1,1], //19
    [1,1,1,1,1,1,1,1,1,1], //20
    [1,1,1,1,1,1,1,1,1,1] //21
]

//hit = 0, stand = 1, 
//double down (hit) = 2 , double down (stand)=3
const Soft = [
    [0,0,0,2,2,0,0,0,0,0], //13 A 2
    [0,0,0,2,2,0,0,0,0,0], //14 A 3
    [0,0,2,2,2,0,0,0,0,0], //15
    [0,0,2,2,2,0,0,0,0,0], //16
    [0,2,2,2,2,0,0,0,0,0], //17
    [3,3,3,3,3,1,1,0,0,0], //18
    [1,1,1,1,3,1,1,1,1,1], //19
    [1,1,1,1,1,1,1,1,1,1], //20
    [1,1,1,1,1,1,1,1,1,1] //21
]

const SplitPhrases = [
    "A pair of 2???s splits against dealer 2 through 7, otherwise hit.",
    "A pair of 3???s splits against dealer 2 through 7, otherwise hit.",
    "A pair of 4???s splits against dealer 5 and 6, otherwise hit.",
    "A pair of 4???s splits against dealer 5 and 6, otherwise hit.",
    "A pair of 6???s splits against dealer 2 through 6, otherwise hit.",
    "A pair of 7???s splits against dealer 2 through 7, otherwise hit.",
    "Always split 8???s",
    "A pair of 9???s splits against dealer 2 through 9, except for 7, otherwise stand.",
    "Never split tens.",
    "Always split aces."
]

const SoftPhrases = [
    "Soft 13 (A,2) doubles against dealer 5 through 6, otherwise hit.",
    "Soft 14 (A,3) doubles against dealer 5 through 6, otherwise hit.",
    "Soft 15 (A,4) doubles against dealer 4 through 6, otherwise hit.",
    "Soft 16 (A,5) doubles against dealer 4 through 6, otherwise hit.",
    "Soft 17 (A,6) doubles against dealer 3 through 6, otherwise hit.",
    "Soft 18 (A,7) doubles against dealer 2 through 6, and hits against 9 through Ace, otherwise stand.",
    "Soft 19 (A,8) doubles against dealer 6, otherwise stand.",
    "Soft 20 (A,9) always stands.",
    "Soft 21 (A,10) always stands."

]

const HardPhrases = [
    "4 always hits.",
    "5 always hits.",
    "6 always hits.",
    "7 always hits.",
    "8 always hits.",
    "9 doubles against dealer 3 through 6 otherwise hit.",
    "10 doubles against dealer 2 through 9 otherwise hit.",
    "11 always doubles.",
    "12 stands against dealer 4 through 6, otherwise hit.",
    "13 stands against dealer 2 through 6, otherwise hit.",
    "14 stands against dealer 2 through 6, otherwise hit.",
    "15 stands against dealer 2 through 6, otherwise hit.",
    "16 stands against dealer 2 through 6, otherwise hit.",
    "17 always stands.",
    "18 always stands.",
    "19 always stands.",
    "20 always stands.",
    "21 always stands."
    
]



export function getPodatkiCards(){
    return cards;
}
export function getPodatkiStates(){
    return gameStates;
}
export function getPodatkiMsg(){
    return Messages;
}
export function getPodatkiDeal(){
    return Deal;
}
export function getSplit(){
    return Split;
}

export function getHard(){
    return Hard;
}

export function getSoft(){
    return Soft;
}

export function getSplitPhrases(){
    return SplitPhrases;
}

export function getHardPhrases(){
    return HardPhrases;
}

export function getSoftPhrases(){
    return SoftPhrases;
}
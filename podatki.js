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
        bet : 'Izberite višino stave!',
        hitStand : 'Izberite potezo',
        bust : 'Bust!',
        userWin : 'Zmagali ste!',
        dealerWin : 'Delivec zmaga!',
        tie : 'Izenačeno! Delivec zmaga!'
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
//hit = 0, stand = 1, double down = 2
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
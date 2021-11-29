
    var cards =  [
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
            hitStand : 'Izberite akcijo',
            bust : 'Bust!',
            userWin : 'Zmagali ste!',
            dealerWin : 'Dealer zmaga!',
            tie : 'Izenačeno! Dealer zmaga!'
    }

    const Deal = {
        user : '0',
        dealer : '1',
        hidden : '2'
    }

    var deck = [];
    var playersCards = [];
    var dealersCards = [];
    var balance = 200;
    var gameState;
    var betValue = 0;
    initGame()
    function  initGame(){
        gameState = gameStates.init;

        //nrdi initial deck
        makeShoe(4);
        setBalance(balance)
        setMessage(Messages.bet)
        //shufflesdeck

        getDeck()
        showGameStartOptions()
    }



    function setBalance(balance){
        var balanceElement = document.getElementById('balanceMoney');
        balanceElement.innerHTML = balance;
    }

    function setMessage(message){
        var messageElement = document.getElementById('message');
        messageElement.innerHTML = message;
    }

    function makeShoe(numberDecks = 1){
         var deck_temp = Array(numberDecks).fill(cards);
         deck = (deck.concat.apply(deck, deck_temp)).filter(Boolean);
    }

    function getDeck(){
        let currentIndex = deck.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }

    }


    function showGameStartOptions(){
        var optionContainer = document.getElementById("controlsContainer");
        optionContainer.innerHTML = showGameStartControls();
    }
    function HideGameStartOptions(){
        var optionContainer = document.getElementById("controlsContainer");
        optionContainer.innerHTML = '';
    }

    function showGameStartControls(){
        return "<div class=\"betContainer\">\n" +
            "<h4>Visina stave</h4>\n" +
            "<input autoFocus type='number' id='BetValue' value= '0'\"\" onChange=\"\" class=\"input\" />\n" +
            "</div>\n" +
            "<button onClick='startGame()' class=\"button\">Bet</button>";
    }

    function startGame(){
        betValue = document.getElementById('BetValue').value;
        if(!betValue){
            alert("Prosim vpišite višino stave");
            return false;
        }
        if(betValue > balance){
            alert("Previsoka stava, vpišite manj");
            return false;
        }
        balance = Math.round((balance - betValue) * 100) / 100;

        setBalance(balance);
        gameState = gameStates.bet;
        drawInitialCards();
        HideGameStartOptions();
        setMessage(Messages.hitStand)
        showCards()
        ShowGameControls();
    }

    function drawInitialCards(){
        drawCard(Deal.user);
        drawCard(Deal.hidden);
        drawCard(Deal.user);
        drawCard(Deal.dealer);
    }

    function drawCard(dealType) {
        if (deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const card = deck[randomIndex];
            deck.splice(randomIndex, 1);
            deck = [...deck];
            console.log('Ostale karte:', deck.length);
            dealCard(dealType, card.value, card.suit);

        }
        else {
            alert('Kart je zmankalo');
        }
    }

    function showCards(){
        var playersCardsDiv = document.getElementById('playersHandDiv');
        var dealersCardsDiv = document.getElementById('dealersHandDiv');
        playersCardsDiv.innerHTML = "";
        dealersCardsDiv.innerHTML = "";
        playersCardsDiv.innerHTML = showPlayersCards();
        dealersCardsDiv.innerHTML = showDealersCards();
    }


    function getCorrectCardFile(card){
        if(card.value == 'K'){
            return './cards/king_of_'+card.suit+'2.png';
        }
        if(card.value == 'Q'){
            return './cards/queen_of_'+card.suit+'2.png';
        }
        if(card.value == 'J'){
            return './cards/jack_of_'+card.suit+'2.png';
        }
        if(card.value == 'A'){
            return './cards/ace_of_'+card.suit+'.png';
        }

        return './cards/'+card.value+'_of_'+card.suit+'.png';
    }

    function showPlayersCards(){
        if(!playersCards.length){
            return false;
        }

        var cards = '';
        playersCards.map((card, index) => {
           if(card.hidden) {
               cards += '<img class="hiddenCard" src="/cards/card_back.png"  alt="karta"/>';
           }else{
               cards += '<div class="CardContainer">\n' +
                            '<img class="card" src="'+getCorrectCardFile(card)+'"  alt="karta"/>\n' +
                        '</div>'
           }

       })


        return "<div class='handContainer'>\n" +
            "      <h1 class='title'>Vaše karte ("+ getHandValue(playersCards)+") </h1>\n" +
            "      <div class='cardContainer'>\n" +
               cards+
            "      </div>\n" +
            "    </div>"
    }

    function showDealersCards(){
        if(!dealersCards.length){
            return false;
        }

        var cards = '';
        dealersCards.map((card, index) => {
            if(card.hidden) {
                cards += '<img class="hiddenCard" src="./cards/card_back.png"  alt="karta"/>';
            }else{
                cards += '<div class="CardContainer">\n' +
                    '<img class="card" src="'+getCorrectCardFile(card)+'"  alt="karta"/>\n' +
                    '</div>'
            }

        })


        return "<div class='handContainer'>\n" +
            "      <h1 class='title'>Dealerjeve karte ("+ getHandValue(dealersCards)+")</h1>\n" +
            "      <div class='cardContainer'>\n" +
            cards+
            "      </div>\n" +
            "    </div>"
    }

    function dealCard(dealType, value, suit){
        switch (dealType) {
            case Deal.user:
                playersCards.push({ 'value': value, 'suit': suit, 'hidden': false });
                playersCards = [...playersCards];
                break;
            case Deal.dealer:
                dealersCards.push({ 'value': value, 'suit': suit, 'hidden': false });
                dealersCards = [...dealersCards];
                break;
            case Deal.hidden:
                dealersCards.push({ 'value': value, 'suit': suit, 'hidden': true });
                dealersCards = [...dealersCards];
                break;
            default:
                break;
        }
    }

    function ShowGameControls(){
        var GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = "  <div class='controlsContainer'>\n" +
            "        <button onClick='hitFunction()'  class='buttonGameControls'>Hit</button>\n" +
            "        <button onClick='standFunction()' class='buttonGameControls'>Stand</button>\n" +
            "        <button onClick='resetGame()'  class='buttonGameControls'>Reset</button>\n" +
            "      </div>"
    }

    function showDisabledControls(){
        var GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = "  <div class='controlsContainer'>\n" +
            "        <button disabled='true' class='buttonGameControls'>Hit</button>\n" +
            "        <button disabled='true' class='buttonGameControls'>Stand</button>\n" +
            "        <button onClick='resetGame()' class='buttonGameControls'>Reset</button>\n" +
            "      </div>"
    }

    function hitFunction(){
        drawCard(Deal.user);
        checkBust();
        showCards();
    }
    function resetGame(){
        playersCards = [];
        dealersCards = [];
        var playersCardsDiv = document.getElementById('playersHandDiv');
        var dealersCardsDiv = document.getElementById('dealersHandDiv');
        playersCardsDiv.innerHTML = "";
        dealersCardsDiv.innerHTML = "";
        hideGameControls();
        showGameStartOptions()

    }

    function hideGameControls(){
        var GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = '';
    }

    function standFunction(){
        showDisabledControls();
        revealCard()
        dealersTurn();
        showCards()
    }

    function checkBust(){
        if(getHandValue(playersCards) > 21){
            showDisabledControls();
            setMessage(Messages.dealerWin);
            revealCard()
            showCards()
        }
    }

    function dealersTurn(){
        if (getHandValue(dealersCards) >= 17) {
            checkWin();
        }
        else {
            while(getHandValue(dealersCards) < 17) {
                drawCard(Deal.dealer);
            }
            checkWin();
        }
    }

    function revealCard(){
        dealersCards.filter((card) => {
            if (card.hidden === true) {
                card.hidden = false;
            }
            return card;
        });
        dealersCards = [...dealersCards];

    }

    function checkWin(){
        playerScore = getHandValue(playersCards);
        dealerScore = getHandValue(dealersCards);
        if (playerScore > dealerScore || dealerScore > 21) {
            balance = Math.round((balance + (betValue * 2)) * 100) / 100;
            setBalance(balance);
            setMessage(Messages.userWin);
        }
        else if (dealerScore > playerScore) {
            setMessage(Messages.dealerWin);
        }
        else {
            balance = Math.round((balance + (betValue * 1)) * 100) / 100;
            setBalance(balance);
            setMessage(Messages.tie);
        }
    }



    function getHandValue(hand){ //podas array ki ima objekte iz cards in ti vrne vrednost
        let vrednosti = []
        for(let i=0; i < hand.length ; i++){
            if(hand[i].hidden)
                continue;
            if(hand[i].value == "K" || hand[i].value == "Q" || hand[i].value == "J"){
                vrednosti.push(10)
            }
            else if(hand[i].value == "A"){
                vrednosti.push(11)
            }else{
                vrednosti.push(parseInt(hand[i].value))
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

        return vsota;
    }

    function add(acc, a){ //pomozna za vsoto array
        return acc + a;
    }


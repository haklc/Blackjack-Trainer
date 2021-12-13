import { getPodatkiCards, getPodatkiDeal, getPodatkiMsg, getPodatkiStates } from "./podatki.js"

    let cards = getPodatkiCards();
    const gameStates = getPodatkiStates();
    const Messages = getPodatkiMsg();
    const Deal = getPodatkiDeal();
    let deck = [];
    let playersHands = [];
    let playersCards = [];
    playersHands.push(playersCards);
    let handIndex = 0;
    let doubledHands = [false];
    let dealersCards = [];
    let balance = 200;
    let gameState;
    let betValue = 0;
    let runningCount = 0;
    let numberOfDecks = 4;
    let trueCount = 0;
    let numberOfShownCards = 0;

    initGame()
    let images = preloadImg(getPodatkiCards());

    function  initGame(){
        gameState = gameStates.init;

        //nrdi initial deck
        makeShoe(4);
        setBalance(balance);
        setMessage(Messages.bet);
        //shufflesdeck

        getDeck();
        showGameStartOptions();
    }

    function preloadImg(args) {
        let images = new Array();
        for (let i = 0; i < args.length; i++) {
            images[i] = new Image();
            images[i].src = getCorrectCardFile(args[i]);
        }
        return images;
    }



    function setBalance(balance){
        let balanceElement = document.getElementById('balanceMoney');
        balanceElement.innerHTML = balance;
    }

    function setMessage(message){
        let messageElement = document.getElementById('message');
        messageElement.innerHTML = message;
    }

    function makeShoe(numberDecks = 1){
            let deck_temp = Array(numberDecks).fill(cards);
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
        let optionContainer = document.getElementById("controlsContainer");
        optionContainer.innerHTML = showGameStartControls();
        document.getElementById("betBut").addEventListener("click",function(){startGame();});
    }
    function HideGameStartOptions(){
        let optionContainer = document.getElementById("controlsContainer");
        optionContainer.innerHTML = '';
    }

    function showGameStartControls(){
        return  "<div class=\"betContainer\">\n" +
        "<h4>Višina stave</h4>\n" +
        "<input autoFocus type='number' id='BetValue' value= '0'\"\" onChange=\"\" class=\"input\" />\n" +
        "</div>\n" +
        "<button id='betBut' class=\"button\">Stavi</button>";
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
        //hideTutorialLinkBut();
        setCounts();
        hideSettingsBut();
        drawInitialCards();
        HideGameStartOptions();
        setMessage(Messages.hitStand);
        showCards();
        ShowGameControls();
    }

    function setCounts(){
        let runningCountEl = document.getElementById('runningCountHidden');
        let trueCountEl = document.getElementById('trueCountHidden');
        let numberOfDecksEl = document.getElementById('numberOfDecksValue')

        runningCountEl.innerHTML = runningCount;
        numberOfDecksEl.innerHTML = numberOfDecks;
        trueCountEl.innerHTML = trueCount;
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
            calculateRunningCount(dealType, card);
            calculateOtherCounts();
            setCounts();
        }
        else {
            alert('Kart je zmankalo');
        }
    }

    function showCards(){
        let playersCardsDiv = document.getElementById('playersHandDiv');
        let dealersCardsDiv = document.getElementById('dealersHandDiv');
        playersCardsDiv.innerHTML = "";
        dealersCardsDiv.innerHTML = "";
        playersCardsDiv.innerHTML = showPlayersCards();
        dealersCardsDiv.innerHTML = showDealersCards();
    }


    function getCorrectCardFile(card){
        if(card.value == 'K'){
            return 'img/cards/king_of_'+card.suit+'2.png';
        }
        if(card.value == 'Q'){
            return 'img/cards/queen_of_'+card.suit+'2.png';
        }
        if(card.value == 'J'){
            return 'img/cards/jack_of_'+card.suit+'2.png';
        }
        if(card.value == 'A'){
            return 'img/cards/ace_of_'+card.suit+'.png';
        }

        return 'img/cards/'+card.value+'_of_'+card.suit+'.png';
    }

    function showPlayersCards() {
        let hand = '';
        playersHands.forEach((playerHand) => {
            let cards = '';
            if (playerHand.length) {
                playerHand.map((card, index) => {
                    if (card.hidden) {
                        cards += '<img class="hiddenCard" src="img/cards/card_back.png"  alt="karta"/>';
                    } else {
                        cards += '<div class="CardContainer">\n' +
                            '<img class="card" src="' + getCorrectCardFile(card) + '"  alt="karta"/>\n' +
                            '</div>';
                    }

                });

                hand += "<div class='handContainer'>\n" +
                    "      <h1 class='title'>Vaše karte (" + getHandValue(playerHand) + ") </h1>\n" +
                    "      <div class='cardContainer'>\n" +
                    cards +
                    "      </div>\n" +
                    "    </div>";
            }
        });

        return hand;
    }

    function showDealersCards(){
        if(!dealersCards.length){
            return false;
        }

        let cards = '';
        dealersCards.map((card, index) => {
            if(card.hidden) {
                cards += '<img class="hiddenCard" src="img/cards/card_back.png"  alt="karta"/>';
            }else{
                cards += '<div class="CardContainer">\n' +
                    '<img class="card" src="' + getCorrectCardFile(card) + '"  alt="karta"/>\n' +
                    '</div>';
            }

        });


        return "<div class='handContainer'>\n" +
            "      <h1 class='title'>Karte delivca (" + getHandValue(dealersCards) + ")</h1>\n" +
            "      <div class='cardContainer'>\n" +
            cards +
            "      </div>\n" +
            "    </div>";
    }

    function dealCard(dealType, value, suit){
        switch (dealType) {
            case Deal.user:
                playersHands[handIndex].push({ 'value': value, 'suit': suit, 'hidden': false });
                playersHands[handIndex] = [...playersHands[handIndex]];
                numberOfShownCards++;
                break;
            case Deal.dealer:
                dealersCards.push({ 'value': value, 'suit': suit, 'hidden': false });
                dealersCards = [...dealersCards];
                numberOfShownCards++;
                break;
            case Deal.hidden:
                dealersCards.push({ 'value': value, 'suit': suit, 'hidden': true });
                dealersCards = [...dealersCards];
                break;
            default:
                break;
        }
    }

    function calculateRunningCount(dealtype,card) {
        if (dealtype == Deal.hidden) return;

        if (['J', 'Q', 'K', 'A'].includes(card.value) || card.value * 1 == 10) {
            runningCount--;
            return;
        }

        if (parseInt(card.value) >= 2 && parseInt(card.value) <= 6) {
            runningCount++;
            return;
        }

    }

    function calculateOtherCounts(){
        numberOfDecks = Math.ceil(((4*52) - numberOfShownCards)/52)
        trueCount =  Math.round(runningCount/numberOfDecks);
    }



    function ShowGameControls(){
        let GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = "  <div class='controlsContainer'>\n" +
            "        <button id='hitBut' class='buttonGameControls'>Hit</button>\n" +
            "        <button id='doubleBut' class='buttonGameControls'>Double</button>\n" +
            "        <button id='splitBut' class='buttonGameControls'>Split</button>\n" +
            "        <button id='standBut' class='buttonGameControls'>Stand</button>\n" +
            "        <button id='resetBut' class='buttonGameControls'>Ponastavi</button>\n" +
            "      </div>";
        
            document.getElementById("hitBut").addEventListener("click",function(){hitFunction();});
            document.getElementById("standBut").addEventListener("click",function(){standFunction();});
            document.getElementById("resetBut").addEventListener("click",function(){resetGame();});

        if (betValue > balance)
            document.getElementById('doubleBut').style.display = "none";
        else
            document.getElementById("doubleBut").addEventListener("click", function () { doubleFunction(); });

        if (playersHands[handIndex][0].value != playersHands[handIndex][1].value || betValue > balance)
            document.getElementById('splitBut').style.display = "none";
        else
            document.getElementById("splitBut").addEventListener("click", function () { splitFunction(); });

    }

    function showDisabledControls(){
        let GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = "  <div class='controlsContainer'>\n" +
            "        <button disabled='true' class='buttonGameControls'>Hit</button>\n" +
            "        <button disabled='true' class='buttonGameControls'>Stand</button>\n" +
            "        <button id='resetBut' class='buttonGameControls'>Ponastavi</button>\n" +
            "      </div>";
        
        document.getElementById("resetBut").addEventListener("click",function(){resetGame();});
    }

    function hitFunction() {
        document.getElementById('splitBut').style.display = "none";
        document.getElementById('doubleBut').style.display = "none";
        drawCard(Deal.user);
        checkBust();
        showCards();
    }
    function doubleFunction() {
        balance = Math.round((balance - betValue) * 100) / 100;
        setBalance(balance);
        doubledHands[handIndex] = true;
        let temp = handIndex;
        hitFunction();
        if (getHandValue(playersHands[handIndex]) <= 21 && temp == handIndex)
            standFunction();
    }
    function splitFunction() {
        document.getElementById('splitBut').style.display = "none";
        balance = Math.round((balance - betValue) * 100) / 100;
        setBalance(balance);
        let splitHand = [];
        splitHand.push(playersHands[handIndex].pop());
        playersHands.push(splitHand);
        drawCard(Deal.user);
        let temp = handIndex;
        handIndex = playersHands.length - 1;
        drawCard(Deal.user);
        handIndex = temp;
        doubledHands.push(false);
        displayDouble();
        displaySplit();
        showCards();

    }
    function resetGame() {
        playersHands = [[]];
        dealersCards = [];
        doubledHands = [false];
        handIndex = 0;
        let playersCardsDiv = document.getElementById('playersHandDiv');
        let dealersCardsDiv = document.getElementById('dealersHandDiv');
        let messageDiv = document.getElementById("message");
        playersCardsDiv.innerHTML = "";
        dealersCardsDiv.innerHTML = "";
        messageDiv.innerHTML = "Izberite višino stave!";
        hideGameControls();
        showGameStartOptions();
        showTutorialLinkBut();
        showSettingsBut();
    }

    function hideGameControls(){
        let GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = '';
    }

    function standFunction() {
        if (handIndex < (playersHands.length - 1)) { //ce nismo koncali z igranjem vseh handov, ponovno enable double&split in nadaljuj z igranjem
            displayDouble();
            handIndex++;
            displaySplit();
            return;
        }
        showDisabledControls();
        revealCard();
        dealersTurn();
        showCards();
    }

    function checkBust() {
        if (getHandValue(playersHands[handIndex]) > 21) {
            if (handIndex < (playersHands.length - 1)) {
                displayDouble();
                handIndex++;
                displaySplit();
                return;
            }
            showDisabledControls();
            setMessage(Messages.dealerWin);
            revealCard();
            if (playersHands.length > 1)
                dealersTurn();
            showCards();
        }
    }

    function displaySplit() {
        if (playersHands[handIndex][0].value == playersHands[handIndex][1].value && betValue <= balance)
            document.getElementById('splitBut').style.display = "inline-block";
    }

    function displayDouble() {
        if (betValue <= balance)
            document.getElementById('doubleBut').style.display = "inline-block";
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
                numberOfShownCards++;
                calculateRunningCount(Deal.dealer, card);
                calculateOtherCounts();
                setCounts();

                card.hidden = false;
            }
            return card;
        });
        dealersCards = [...dealersCards];

    }

    function checkWin() {
        for (let i = 0; i < playersHands.length; i++) {
            let playerScore = getHandValue(playersHands[i]);
            let dealerScore = getHandValue(dealersCards);
            let multiplier = 1;
            if (doubledHands[i])
                multiplier = 2;
            if (playerScore > 21)
                return;
            if (playerScore > dealerScore || dealerScore > 21) {
                balance = Math.round((balance + (betValue * 2 * multiplier)) * 100) / 100;
                setBalance(balance);
                setMessage(Messages.userWin);
            }
            else if (dealerScore > playerScore) {
                setMessage(Messages.dealerWin);
            }
            else {
                balance = Math.round((balance + (betValue * 1 * multiplier)) * 100) / 100;
                setBalance(balance);
                setMessage(Messages.tie);
            }
        }

    }



export    function getHandValue(hand){ //podas array ki ima objekte iz cards in ti vrne vrednost
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

        return vsota;
    }

    function add(acc, a){ //pomozna za vsoto array
        return acc + a;
    }

    /*function showTutorialLinkBut(){
        document.getElementById('tutorialLinkBut').style.visibility = "visible";
    }

    function hideTutorialLinkBut(){
        document.getElementById('tutorialLinkBut').style.visibility = "hidden";
    }*/

    function showSettingsBut(){
        document.getElementById("settingsBut").style.visibility = "visible";
    }

    function hideSettingsBut(){
        document.getElementById("settingsBut").style.visibility = "hidden";
    }
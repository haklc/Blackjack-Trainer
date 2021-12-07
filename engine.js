import { getPodatkiCards, getPodatkiDeal, getPodatkiMsg, getPodatkiStates } from "./podatki.js"

    let cards = getPodatkiCards();
    const gameStates = getPodatkiStates();
    const Messages = getPodatkiMsg();
    const Deal = getPodatkiDeal();
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
        showGameStartOptions();
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
        document.getElementById("betBut").addEventListener("click",function(){startGame();});
    }
    function HideGameStartOptions(){
        var optionContainer = document.getElementById("controlsContainer");
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
        hideTutorialLinkBut();
        hideSettingsBut();
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
                cards += '<img class="hiddenCard" src="cards/card_back.png"  alt="karta"/>';
            }else{
                cards += '<div class="CardContainer">\n' +
                    '<img class="card" src="'+getCorrectCardFile(card)+'"  alt="karta"/>\n' +
                    '</div>'
            }

        })


        return "<div class='handContainer'>\n" +
            "      <h1 class='title'>Karte delivca ("+ getHandValue(dealersCards)+")</h1>\n" +
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
            "        <button id='hitBut' class='buttonGameControls'>Hit</button>\n" +
            "        <button id='standBut' class='buttonGameControls'>Stand</button>\n" +
            "        <button id='resetBut' class='buttonGameControls'>Ponastavi</button>\n" +
            "      </div>"
        
            document.getElementById("hitBut").addEventListener("click",function(){hitFunction();});
            document.getElementById("standBut").addEventListener("click",function(){standFunction();});
            document.getElementById("resetBut").addEventListener("click",function(){resetGame();});
        
    }

    function showDisabledControls(){
        var GameControlsDiv = document.getElementById('gameControlsDiv');
        GameControlsDiv.innerHTML = "  <div class='controlsContainer'>\n" +
            "        <button disabled='true' class='buttonGameControls'>Hit</button>\n" +
            "        <button disabled='true' class='buttonGameControls'>Stand</button>\n" +
            "        <button id='resetBut' class='buttonGameControls'>Ponastavi</button>\n" +
            "      </div>"
        
        document.getElementById("resetBut").addEventListener("click",function(){resetGame();});
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
        showGameStartOptions();
        showTutorialLinkBut();
        showSettingsBut();

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
        let playerScore = getHandValue(playersCards);
        let dealerScore = getHandValue(dealersCards);
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

    function showTutorialLinkBut(){
        document.getElementById('tutorialLinkBut').style.visibility = "visible"
    }

    function hideTutorialLinkBut(){
        document.getElementById('tutorialLinkBut').style.visibility = "hidden";
    }

    function showSettingsBut(){
        document.getElementById("settingsBut").style.visibility = "visible";
    }

    function hideSettingsBut(){
        document.getElementById("settingsBut").style.visibility = "hidden";
    }
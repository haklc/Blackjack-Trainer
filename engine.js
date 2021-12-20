import { PlayAnswer, PlayPhrases, SplitAnswer, SplitPhrase } from "./basicStrategy.js";
import { getPodatkiCards, getPodatkiDeal, getPodatkiMsg, getPodatkiStates } from "./podatki.js"

    let cards = getPodatkiCards();
    const gameStates = getPodatkiStates();
    const Messages = getPodatkiMsg();
    const Deal = getPodatkiDeal();
    let deck = [];
    let playersHands = [];
    let botsHands = [];
    playersHands.push([]);
    let handIndex = 0;
    let botIndex = 0;
    let doubledHands = [false];
    let dealersCards = [];
    let gameState;
    
    let runningCount = 0;
    let numberOfDecks = 4;
    let trueCount = 0;
    let numberOfShownCards = 0;
    let botsActive = 0;
    let trueCountThreshold = 3;

    let move_hand=0;

    let images = preloadImg(getPodatkiCards());
    initGame()
    

    function  initGame(){
        gameState = gameStates.init;

        //nrdi initial deck
        makeShoe(4);
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




    function setMessage(message, reset = true, addNum = ""){
        let messageElement = document.getElementById('message');
        if (reset)
            messageElement.innerHTML = addNum + message;
        else
            messageElement.innerHTML += ("\n" + addNum + message);
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
        document.getElementById("betHighBut").addEventListener("click",function(){checkHB();});
        document.getElementById("betLowBut").addEventListener("click",function(){checkLB();});
        //document.getElementById("betBut").addEventListener("click",function(){startGame();});
        document.getElementById("addBot").addEventListener("click",function(){addBot();});
    }
    function HideGameStartOptions(){
        let optionContainer = document.getElementById("controlsContainer");
        optionContainer.innerHTML = '';
    }

    function showGameStartControls(){
        //"<div class=\"betContainer\">\n" +
        //"<h4>Višina stave</h4>\n" +
        //"<input autoFocus type='number' id='BetValue' value= '0'\"\" onChange=\"\" class=\"input\" />\n" +
        //"</div>\n" +
        return "<button id='betHighBut' class=\"button\">Bet High</button>" +
        "<button id='betLowBut' class=\"button\">Bet Low</button>" +
        //"<button id='betBut' class=\"button\">Stavi</button>" +
        "<button id='addBot' class=\"button\">Dodaj igralca</button>";
    }

    function checkHB(){
        if(trueCount < trueCountThreshold){
            alert("Narobe, morali bi staviti nizko!");
        }
        startGame();
    }

    function checkLB(){
        if(trueCount >= trueCountThreshold){
            alert("Narobe, morali bi staviti visoko!");
        }
        startGame();
    }

    function startGame(){

        
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
        //drawCard(Deal.user);
        //drawCard(Deal.hidden);
        //drawCard(Deal.user);
        //drawCard(Deal.dealer);

        drawBot(0);
        drawCard(Deal.user);
        drawCard(Deal.hidden);
        drawBot(1);

        drawBot(0);
        drawCard(Deal.user);
        drawCard(Deal.dealer);
        drawBot(1);

        botsTurn(0);
}

    function drawBot(bot) {
        if (botsActive > bot) {
            botIndex = bot;
            drawCard(Deal.bot);
        }
    }


    function botsTurn(bot) {
        if (botsActive <= bot)
            return;
        while (getHandValue(botsHands[bot]) < 17) {
            botIndex = bot;
            drawCard(Deal.bot);
        }
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
        playersCardsDiv.innerHTML = showBotsCards(0);
        playersCardsDiv.innerHTML += showPlayersCards();
        playersCardsDiv.innerHTML += showBotsCards(1);
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
        for (let i = 0; i < playersHands.length; i++) {
            let cards = '';
            if (playersHands[i].length) {
                playersHands[i].map((card, index) => {
                    if (card.hidden) {
                        cards += '<img class="hiddenCard" src="img/cards/card_back.png"  alt="karta"/>';
                    } else if (i == handIndex || handIndex >= playersHands.length) {
                        cards += '<div class="CardContainer">\n' +
                            '<img class="card" src="' + getCorrectCardFile(card) + '" alt="karta"/>\n' +
                            '</div>';
					}
                    else {
                        cards += '<div class="CardContainer">\n' +
                            '<img class="card" src="' + getCorrectCardFile(card) + '" style="opacity:0.7" alt="karta"/>\n' +
                            '</div>';
                    }

                });
                let mark = "";
                if (playersHands.length > 1)
                    mark = "[" + (i + 1) + "] ";
                hand += "<div class='handContainer'>\n" +
                    "      <h1 class='title'>" + mark + "Vaše karte (" + getHandValue(playersHands[i]) + ") </h1>\n" +
                    "      <div class='cardContainer'>\n" +
                    cards +
                    "      </div>\n" +
                    "    </div>";
            }
        }
        return hand;
    }

    function showBotsCards(bot) {
        let hand = '';
        let cards = '';
        if (bot < botsHands.length) {
            botsHands[bot].map((card, index) => {
                if (card.hidden) {
                    cards += '<img class="hiddenCard" src="img/cards/card_back.png"  alt="karta"/>';
                }
                //} else if (botIndex >= botsHands.length) {
                //    cards += '<div class="CardContainer">\n' +
                //        '<img class="card" src="' + getCorrectCardFile(card) + '" alt="karta"/>\n' +
                //        '</div>';
                //}
                else {
                    cards += '<div class="CardContainer">\n' +
                        '<img class="card" src="' + getCorrectCardFile(card) + '" style="opacity:0.7" alt="karta"/>\n' +
                        '</div>';
                }

            });
            hand += "<div class='handContainer'>\n" +
                "      <h1 class='title'>Soigralčeve karte (" + getHandValue(botsHands[bot]) + ") </h1>\n" +
                "      <div class='cardContainer'>\n" +
                cards +
                "      </div>\n" +
                "    </div>";
        }
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

    function addBot() {
        if (botsActive == 2)
            return;
        botsHands.push([]);
        botsActive++;
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
            case Deal.bot:
                botsHands[botIndex].push({ 'value': value, 'suit': suit, 'hidden': false });
                botsHands[botIndex] = [...botsHands[botIndex]];
                numberOfShownCards++;
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
        
            document.getElementById("hitBut").addEventListener("click",function(){hitFunction(0);});
            document.getElementById("standBut").addEventListener("click",function(){standFunction(0);});
            document.getElementById("resetBut").addEventListener("click",function(){resetGame();});

       
        document.getElementById("doubleBut").addEventListener("click", function () { doubleFunction(); });

        if (playersHands[handIndex][0].value != playersHands[handIndex][1].value)
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
    function CheckIfCorrectMove(move,turn){
        let spl_answer = SplitAnswer(playersHands[handIndex],dealersCards);
        let dd_answer = PlayAnswer(playersHands[handIndex],dealersCards);
        let ply_answer = PlayAnswer(playersHands[handIndex],dealersCards); //od 0,1,2,3
        //move; 0:hit 1:stand, 2:double
        if (turn == 0){ //check ce moramo spliata
            
            if(spl_answer == 1 && move != 4){ //ce bi mogli split in nismo
                //console.log("Mogu bi split "+SplitPhrase(playersHands[handIndex]))
                alert(SplitPhrase(playersHands[handIndex]))
            }

            if((dd_answer == 2 || dd_answer == 3) && move != 2){ //ce nismo dd ko bi mogli
                //console.log("1: "+PlayPhrases(playersHands[handIndex]))
                alert(PlayPhrases(playersHands[handIndex]))
            }

            if(spl_answer == 0 && move == 4){ //ce smo split in ne bi smeli
               // console.log("Ne bi smel split: "+SplitPhrase(playersHands[handIndex]))
                alert(SplitPhrase(playersHands[handIndex]))
                return
            }
            if((dd_answer == 2 || dd_answer == 3) && move == 2){ //ce smo dd ko smo mogli
                return
            }
            if(ply_answer == move){
                return
            }else{
                //console.log("2: "+PlayPhrases(playersHands[handIndex]))
                alert(PlayPhrases(playersHands[handIndex]))
            }
            
        }else{
            if(ply_answer % 2 == move){
                return;
            }else{
                //console.log("3: "+PlayPhrases(playersHands[handIndex]))
                alert(PlayPhrases(playersHands[handIndex]))
            }}
    }


    function hitFunction(izDD) { //izDD pove ce smo prsi iz doubledown (za potrebo preverjanja)
        
        if(izDD == 0){ //ce nismo iz DD prsli, imamo navaden hit -> preverimo pravilnost
            CheckIfCorrectMove(0,move_hand);
            move_hand++;
        }
        document.getElementById('splitBut').style.display = "none";
        document.getElementById('doubleBut').style.display = "none";
        drawCard(Deal.user);
        checkBust();
        showCards();
    }

    function standFunction(izDD) {
        if(izDD==0){
            CheckIfCorrectMove(1,move_hand);
        }
        move_hand=0;
        if (handIndex < (playersHands.length - 1)) { //ce nismo koncali z igranjem vseh handov, ponovno enable double&split in nadaljuj z igranjem
            displayDouble();
            handIndex++;
            displaySplit();
            showCards();
            return;
        }
        showDisabledControls();
        revealCard();
        dealersTurn();
        handIndex++;
        showCards();
    }

    function doubleFunction() {
        CheckIfCorrectMove(2,move_hand);
        move_hand++;

        doubledHands[handIndex] = true;
        let temp = handIndex;
        hitFunction(1);
        console.log("Hand index: "+handIndex)
        console.log(playersHands)
        if (getHandValue(playersHands[handIndex]) <= 21 && temp == handIndex)
            standFunction(1);
    }
    function splitFunction() {
        CheckIfCorrectMove(4,move_hand);
        move_hand++;
        document.getElementById('splitBut').style.display = "none";
        
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
        botsHands = [];
        dealersCards = [];
        doubledHands = [false];
        move_hand = 0
        handIndex = 0;
        botsActive = 0;
        botIndex = 0;
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

   

    function checkBust() {
        if (getHandValue(playersHands[handIndex]) > 21) {
            if (handIndex < (playersHands.length - 1)) {
                displayDouble();
                handIndex++;
                move_hand = 0;
                displaySplit();
                showCards();
                return;
            }
            showDisabledControls();
            setMessage(Messages.dealerWin);
            revealCard();
            if (playersHands.length > 1)
                dealersTurn();
            handIndex++;
            showCards();
        }
    }

    function displaySplit() {
        if (playersHands[handIndex][0].value == playersHands[handIndex][1].value)
            document.getElementById('splitBut').style.display = "inline-block";
    }

    function displayDouble() {
        document.getElementById('doubleBut').style.display = "inline-block";
    }

    function dealersTurn() {
        botsTurn(1);
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
        let msgReset = true;
        let addNum = "";
        for (let i = 0; i < playersHands.length; i++) {
            let playerScore = getHandValue(playersHands[i]);
            let dealerScore = getHandValue(dealersCards);
            let multiplier = 1;
            if (doubledHands[i])
                multiplier = 2;
            if (playersHands.length > 1)
                addNum = "[" + (i + 1) + "] ";
            if (playerScore > 21) {
                setMessage(Messages.dealerWin, msgReset, addNum);
                msgReset = false;
                continue;
			}
            if (playerScore > dealerScore || dealerScore > 21) {
                setMessage(Messages.userWin, msgReset, addNum);
            }
            else if (dealerScore > playerScore) {
                setMessage(Messages.dealerWin, msgReset, addNum);
            }
            else {
                setMessage(Messages.tie, msgReset, addNum);
            }
            msgReset = false;
        }

    }



export    function getHandValue(hand){ //podas array ki ima objekte iz cards in ti vrne vrednost
        //console.log(hand)
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

export function add(acc, a){ //pomozna za vsoto array
        return acc + a;
    }

    function showTutorialLinkBut(){
        document.getElementById('tutorialLinkBut').style.visibility = "visible";
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

    document.addEventListener('keydown', (e) => { // za lažje in hitrejše testiranje splita, na koncu gre to ven
        if (e.key == 'e')
            startGame();
        if (e.key == 'r')
            resetGame();
    });
